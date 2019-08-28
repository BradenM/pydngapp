# -*- coding: utf-8 -*-

"""Python Backend for PyDNGConverter GUI"""

import signal

import gevent
import zerorpc


class PyDNGApi:

    def echo(self, text):
        print(text)
        return text


def main():
    addr = 'tcp://127.0.0.1:4242'
    serv = zerorpc.Server(PyDNGApi())
    serv.bind(addr)
    print('server running on:', addr)
    serv.run()


if __name__ == '__main__':
    main()
