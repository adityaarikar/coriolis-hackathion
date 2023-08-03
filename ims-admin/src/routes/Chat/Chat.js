import axios from 'axios';
import constants from '../../constants';
import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    ansBox: {
        width: '100%',
        height: 500,
        borderWidth: 5,
        borderColor: 'red',
        backgroundColor: '#dddddd',
        borderRadius: 10
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10
    },
    input: {
        width: '100%'
    },
    send: {
        marginLeft: 10
    },
    innerAnswer: {
        padding: 10
    }
});

const Chat = () => {
    const classes = useStyles();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const changeQuestionHandler = (event) => {
        setQuestion(event.target.value);
    };

    const getQuestion = async () => {
        axios
            .get(`${constants.url}chat/`, {
                params: {
                    question: question
                }
            })
            .then((responce) => {
                console.log('ChatGpt Responce ', responce.data.result);
                setAnswer(responce.data.result);
            })
            .catch((err) => {
                console.log('Error ', err);
            });
    };

    console.log('Answer', answer);

    const submitHandler = (event) => {
        event.preventDefault();
        getQuestion();
        setQuestion('');
    };

    return (
        <div className={classes.main}>
            <div className={classes.ansBox}>
                <h5 className={classes.innerAnswer}>{answer ? `${answer}` : null}</h5>
            </div>
            <Form className={classes.form} onSubmit={submitHandler}>
                <Form.Group controlId='form.name' className={classes.input}>
                    <Form.Control
                        type='text'
                        value={question}
                        onChange={changeQuestionHandler}
                        placeholder='Ask to stock bot...'
                        required
                    />
                </Form.Group>
                <Button
                    className={classes.send}
                    variant='primary'
                    type='submit'
                    onSubmit={submitHandler}
                >
                    Send
                </Button>
            </Form>
        </div>
    );
};

export default Chat;
