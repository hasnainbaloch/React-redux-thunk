import React, { useState } from 'react';
import './style.css';
import { Switch } from 'antd';
import { DeleteOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';

export default function User(props) {

    // PROPS 
    const {
        name,
        userId,
        userEmail,
        key,
        avatar,
        filterHandler
    } = props;


    // States
    const [isActive, setActive] = useState(true);
    const [isFavorite, setFavorite] = useState(true);
    const [isDeleteView, setDeleteView] = useState(false);

    // Switch Toggle handler 
    const toggleSwitchHandler = () => {
        setActive(!isActive);
    }

    //Delete handler 
    const deleteHandler = () => {
        setDeleteView(true);
    }

    //Cancel Delete handler 
    const cancelDeleteHandler = () => {
        setDeleteView(false);
    }

    //favorite handler 
    const favoriteHandler = () => {
        setFavorite(!isFavorite);
    }

    return (
        <>
            <div className="cardWrap" key={key}>
                <div className={isActive ? "userInfo activeCard" : "userInfo"}>
                    <div className="img-wrap">
                        <img src={avatar} alt="user avatar" />
                        <span className="heartContainer">
                            {
                                isFavorite ?
                                    <HeartOutlined
                                        onClick={favoriteHandler}
                                        style={{ fontSize: '26px', color: 'white' }}
                                    /> :
                                    <HeartFilled
                                        onClick={favoriteHandler}
                                        style={{ fontSize: '26px', color: 'crimson' }}
                                    />
                            }
                        </span>
                    </div>
                    <div>
                        <b className="current-user-state">{isActive ? 'Active' : 'Disable'}</b>
                        <h4>
                            <b>{userId} &nbsp;</b><b>Name: &nbsp;</b> {name}
                        </h4>
                        <hr />
                        <div className="user-info">
                            <div>
                                <b>Email: </b><br />
                                <p>{userEmail}</p>
                            </div>
                        </div>
                        <div className="actions">
                            {!isActive &&
                                <span className="deleteContainer">
                                    <DeleteOutlined
                                        onClick={deleteHandler}
                                        style={{ fontSize: '26px', color: 'crimson' }}
                                    />
                                </span>
                            }
                            <span className="switchContainer">
                                <Switch checked={isActive} onChange={toggleSwitchHandler} />
                            </span>
                        </div>
                    </div>
                </div>

                {
                    isDeleteView && (
                        <>
                            <div className="overlay"></div>
                            <div className="deleteViewWrap">
                                <div className="deleteView">
                                    <h4 className="delete-title">Are you sure you want to <b>Delete</b> {name}?</h4>
                                    <Button className="delete-action-btn" onClick={cancelDeleteHandler}>Cancel</Button>
                                    <Button className="delete-action-btn" onClick={filterHandler} type="primary" danger>Sure</Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}
