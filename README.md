# PiRC (client code)

PiRC is a standalone or embedded chat client to communicate between two or more parties. It includes custom authentication using JWTs, as well as AES256 encryption on all outgoing data.

## Instalation

install all required packages using `npm i`

creating a .env file that holds the following
```
REACT_APP_API=url-of-server
REACT_APP_HAS_KEY=same-encryption-key-from-server-env
```
