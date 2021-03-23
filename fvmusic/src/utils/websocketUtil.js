
import Store from '../store/index'

const websocket = {
    data: {
        socket : null,
    },

    initWebSocket () { // 初始化weosocket
        console.log('websocket init')
        let userId = Store.getters.userInfo.id
        if (userId === undefined || userId === '' || userId === null){
            return
        }
        this.socket = new WebSocket('ws://47.116.78.131/websocket/' + userId)

        this.socket.onmessage = this.websocketonmessage

        this.socket.onerror = this.websocketonerror

        this.socket.onopen = this.websocketonopen

        this.socket.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
        let data = {
            code: 0,
            msg: '这是client：初次连接'
        }
        // this.websocketsend(JSON.stringify(data))
    },
    websocketonerror () {
        console.log( 'WebSocket连接失败')
    },
    /**
     * 接收数据
     * @param e
     */
    websocketonmessage (e) { // 数据接收
        console.log('数据接收======> ')
        // console.log(JSON.parse(e.data))
        Store.commit('setMessage', e.data)
        console.log(Store.state.socketMessage)
    },
    websocketsend (Data) { // 数据发送
        this.websock.send(Data)
    },
    websocketclose (e) {  // 关闭
        console.log('已关闭连接', e)
    },

}
export default websocket