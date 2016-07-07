var Msgform = React.createClass ({
    handlerSubmit: function (even) {
        even.preventDefault();
        var content = {
            content: this.refs.content.value.trim(),
            nickname: this.refs.nickname.value.trim()
        }
        if (!content.content) {
            alert('消息为空。');
            return;
        }
        this.props.onPostSubmit({content: content})
        this.refs.content.value = '';
        this.refs.nickname.value = '';
    },
    render: function () {
        return (
            <form className="clearfix" onSubmit={this.handlerSubmit}>
                <textarea name="content" className="textarea" ref="content"></textarea>
                <input name="nickname" className="input" ref="nickname" placeholder="Nickname"></input>
                <button className="btn btn-1 fr mr10">Post</button>
            </form>
        )
    }
});

var Msglist = React.createClass ({
    render: function () {
        var msgNodes = this.props.data.map(function (params) {
            return (
                <Msg>{params.content}</Msg>
            )
        });
        return (
            <ul className="list clearfix">{msgNodes}</ul>
        )
    }
})

var Msg = React.createClass ({
    render: function () {
        var content = this.props.children;
        var time = new Date().toLocaleString();
        if (!content.content) {
            alert('内容不能为空。');
            return;
        }
        var name = content.nickname || 'Anonymous';
        return (
            <li className="item">
                <div className="fl">
                    <a href="#"><img src="img/avatar.jpg" alt="" className="avatar" /></a>
                </div>
                <div className="item-r">
                    <div className="msg">
                        <strong><a href="#">{name}</a></strong>
                        <span>{time}</span>
                    </div>
                    <div className="content">{content.content}</div>
                </div>
            </li>
        )
    }
})

var Msgbox = React.createClass ({
    getInitialState: function () {
        return {
            data: []
        };
    },
    handlerMsgSubmit: function (params) {
        var msg = this.state.data;
        var newMsg = msg.concat([params]);
        this.setState({
            data: newMsg
        });
        return;
    },
    render: function () {
        return (
            <div>
            <Msgform onPostSubmit={this.handlerMsgSubmit} />
            <Msglist data={this.state.data} />
            </div>
        )
    }
})

//render app
ReactDOM.render(
    <Msgbox />,
    document.getElementById('content')
)