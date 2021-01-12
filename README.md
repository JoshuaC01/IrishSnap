# Irish Snap
##### Made using Python, Websockets, Javascript and Phaser.io

Irish snap is a fast paced permutation of snap with a few extra rules.  

The server is written in python and the client in Javascript using the [Phaser.io](http://phaser.io/) game library  

## Server
To start the server simply run
```
> cd ./Path/To/Server/
> python3 main.py
```

Note the server address and port  
<br/>

## Client
Open `scripts/scenes/game.js`  
Change `WEBSOCKET_URL` to the servers url and port (`ws://[address]:[port]/`)  
Run the client on a webserver (e.g. XAMPP, Apache, etc)  

**OR**
```
> cd ./Path/To/Client/
> python3 -m http.server 8080
```
And open `http://url:8080`
