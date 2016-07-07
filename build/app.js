var Msgform = React.createClass ({displayName: "Msgform",
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
            React.createElement("form", {className: "clearfix", onSubmit: this.handlerSubmit}, 
                React.createElement("textarea", {name: "content", className: "textarea", ref: "content"}), 
                React.createElement("input", {name: "nickname", className: "input", ref: "nickname", placeholder: "Nickname"}), 
                React.createElement("button", {className: "btn btn-1 fr mr10"}, "Post")
            )
        )
    }
});

var Msglist = React.createClass ({displayName: "Msglist",
    render: function () {
        var msgNodes = this.props.data.map(function (params) {
            return (
                React.createElement(Msg, null, params.content)
            )
        });
        return (
            React.createElement("ul", {className: "list clearfix"}, msgNodes)
        )
    }
})

var Msg = React.createClass ({displayName: "Msg",
    render: function () {
        var content = this.props.children;
        var time = new Date().toLocaleString();
        if (!content.content) {
            alert('内容不能为空。');
            return;
        }
        var name = content.nickname || 'Anonymous';
        return (
            React.createElement("li", {className: "item"}, 
                React.createElement("div", {className: "fl"}, 
                    React.createElement("a", {href: "#"}, React.createElement("img", {src: "img/avatar.jpg", alt: "", className: "avatar"}))
                ), 
                React.createElement("div", {className: "item-r"}, 
                    React.createElement("div", {className: "msg"}, 
                        React.createElement("strong", null, React.createElement("a", {href: "#"}, name)), 
                        React.createElement("span", null, time)
                    ), 
                    React.createElement("div", {className: "content"}, content.content)
                )
            )
        )
    }
})

var Msgbox = React.createClass ({displayName: "Msgbox",
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
            React.createElement("div", null, 
            React.createElement(Msgform, {onPostSubmit: this.handlerMsgSubmit}), 
            React.createElement(Msglist, {data: this.state.data})
            )
        )
    }
})

//render app
ReactDOM.render(
    React.createElement(Msgbox, null),
    document.getElementById('content')
)