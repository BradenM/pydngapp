# -*- coding: utf-8 -*-

"""Python Backend for PyDNGConverter GUI"""

import sys
from pathlib import Path

pkgs = Path(__file__).parent / '.venv' / 'lib' / 'python3.7' / 'site-packages'

sys.path.insert(0, str(pkgs))

import ray  # noqa
import zerorpc  # noqa
from pydngconverter import DNGConverter  # noqa


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
