import asyncio
import websockets
import json

SRV_PLAYER_INIT = "SRV_PLAYER_INIT"
MSG_REQUEST_STATE = "MSG_REQUEST_STATE"

last_id = 0
joined_players = []

game_state = {}

async def player_connection(websocket, path):
    global last_id, joined_players
    # On Player Connect
    player_info = {
        "id": last_id,
        "name": f"Player {last_id}"
    }
    joined_players.append(player_info)

    print(f"Player {player_info['id']} joined")

    await websocket.send(json.dumps({
        "type": SRV_PLAYER_INIT,
        "content": {
            "info": player_info
        }
    }))
    last_id += 1

    # On Player Message
    async for message in websocket:
        data = json.loads(message)
        print(f"message recieved {data}")
        await websocket.send(json.dumps({
            "msg": "I recieved your message",
            "state": {
                "curPlayer": 5
            },
        }))

    # On Socket Close

    print(f"Player {player_info['id']} left")
    joined_players.remove(player_info)

start_server = websockets.serve(player_connection, "localhost", 8888)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
