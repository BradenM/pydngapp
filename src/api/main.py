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
        for converted in pydng.convert():
            yield converted


def main():
    addr = 'tcp://127.0.0.1:4242'
    serv = zerorpc.Server(PyDNGApi())
    serv.bind(addr)
    print('server running on:', addr)
    serv.run()


if __name__ == '__main__':
    main()
