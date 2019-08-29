# -*- coding: utf-8 -*-

"""Python Backend for PyDNGConverter GUI"""

from pathlib import Path

import ray
import zerorpc

from pydngconverter import DNGConverter


class PyDNGApi:

    def echo(self, text):
        print(text)
        return text

    @zerorpc.stream
    def convert(self, source, dest):
        pydng = DNGConverter(
            source, dest=dest, multiprocess=True, fast_load=True, linear=True)
        img_ids = pydng.convert()
        completed = set()
        num_cpus = ray.available_resources().get('CPU', 8)
        print(num_cpus)
        while True:
            ready_ids, remaining_ids = ray.wait(
                img_ids, num_returns=(num_cpus + len(completed)))
            print("REMAINING: ", len(remaining_ids))
            for _i in ready_ids:
                if _i not in completed:
                    yield ray.get(_i)
                completed.add(_i)
            if len(remaining_ids) == 0:
                print("DONE!")
                print(completed)
                break


def main():
    addr = 'tcp://127.0.0.1:4242'
    serv = zerorpc.Server(PyDNGApi())
    serv.bind(addr)
    print('server running on:', addr)
    serv.run()


if __name__ == '__main__':
    main()
