import React, {useState} from 'react'
import {Button, ButtonGroup} from "reactstrap";
import UserList from "../components/UserList";
import {
    accept_friend_request, cancel_friend_request, delete_friend,
    deny_friend_request,
    get_friends,
    get_received_friend_requests,
    get_sent_friend_requests
} from "../requests";

const Friends = () => {
    const [rSelected, setRSelected] = useState("Друзья");
    const [actions, setActions] = useState({
        getUsers: get_friends,
        nameAction1: "",
        actionToUser1: undefined,
        nameAction2: "удалить",
        actionToUser2: delete_friend
    })

    return (<div className="my-container">
        <div className="d-flex">
            <h1 className="my-3">{rSelected}</h1>
            <ButtonGroup className="ms-auto">
                <Button outline
                        onClick={() => {
                            setRSelected("Друзья")
                            setActions({
                                getUsers: get_friends,
                                nameAction1: "",
                                actionToUser1: undefined,
                                nameAction2: "удалить",
                                actionToUser2: delete_friend,
                            })
                        }}
                        active={rSelected === "Друзья"}
                >
                    Друзья
                </Button>
                <Button outline
                        onClick={() => {
                            setRSelected("Исходящие")
                            setActions({
                                getUsers: get_sent_friend_requests,
                                nameAction1: "",
                                actionToUser1: undefined,
                                nameAction2: "отменить",
                                actionToUser2: cancel_friend_request,
                            })
                        }}
                        active={rSelected === "Исходящие"}
                >
                    Исходящие
                </Button>
                <Button outline
                        onClick={() => {
                            setRSelected("Входящие")
                            setActions({
                                getUsers: get_received_friend_requests,
                                nameAction1: "принять",
                                actionToUser1: accept_friend_request,
                                nameAction2: "отклонить",
                                actionToUser2: deny_friend_request
                            })
                        }}
                        active={rSelected === "Входящие"}
                >
                    Входящие
                </Button>
            </ButtonGroup>
        </div>
        <UserList
            getUsers={actions.getUsers}
            nameAction1={actions.nameAction1}
            nameAction2={actions.nameAction2}
            actionToUser1={actions.actionToUser1}
            actionToUser2={actions.actionToUser2}
        />
    </div>)
}

export default Friends