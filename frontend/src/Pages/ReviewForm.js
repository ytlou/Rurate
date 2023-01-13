import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Course from '../sample_data/Course.json'
import Prof from '../sample_data/Professor.json'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ReviewForm() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [content, setContent] = useState("");
    const [score0, setScore0] = useState(0);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [score3, setScore3] = useState(0);

    let callapi = async () => {

        let realscore0 = parseInt(score0.substring(0, 1));
        let realscore1 = parseInt(score1.substring(0, 1));
        let realscore2 = parseInt(score2.substring(0, 1));
        let realscore3 = parseInt(score3.substring(0, 1));

        const returnObject = { 'content': content, 'score0': realscore0, 'score1': realscore1, 'score2': realscore2, 'score3': realscore3 }
        console.log(returnObject)
        fetch(`http://127.0.0.1:8000/api/createReview/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(returnObject)
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        }).catch(error => {
            console.log(error)
        })
    }



    /*const code = Course.code.map((val, index) => {
        return (<option value={val} key={index}>{val}</option>);
    })*/

    const code = ["", "16:198:512", "16:198:513", "16:198:514"].map((val, index) => {
        return (<option value={val} key={index}>{val}</option>);
    })

    const prof = ["", "A", "B", "C"].map((val, index) => {
        return (<option value={val} key={index}>{val}</option>);
    })

    const scorelist = ["", "5 (Strongly Recommended)", "4 (Recommended)", "3 (Good)", "2 (Below Average)", "1 (Awful Feeling)"].map((val, index) => {
        return (<option value={val} key={index}>{val}</option>);
    })

    function handleSubmit(event) {
        event.preventDefault();

        if (score0.length < 1 || score1.length < 1 || score2.length < 1 || score3.length < 1) {
            handleShow();
        } else {
            callapi();
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>

                {/*<Form.Group controlId="course">
                    <Form.Label><h5>Course Code</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore(e.target.value)}>
                        {code}
                    </Form.Control>
                    <Form.Label><h5>Professor</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore(e.target.value)}>
                        {prof}
                    </Form.Control>
                    <br></br>
                    <br></br>
                </Form.Group>*/}

                <Form.Group controlId="score0">
                    <Form.Label><h5>Overall Quality</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore0(e.target.value)}>
                        {scorelist}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="score1">
                    <Form.Label><h5>Course Difficulty</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore1(e.target.value)}>
                        {scorelist}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="score2">
                    <Form.Label><h5>Professor</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore2(e.target.value)}>
                        {scorelist}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="score3">
                    <Form.Label><h5>Future Help</h5></Form.Label>
                    <Form.Control as="select" onChange={(e) => setScore3(e.target.value)}>
                        {scorelist}
                    </Form.Control>
                    <br></br>
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label><h5>Review content</h5></Form.Label>
                    <Form.Control type="text" placeholder="Enter content" onChange={(e) => setContent(e.target.value)} />
                    <br></br>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Wrong input!</Modal.Title>
                </Modal.Header>
                <Modal.Body>No empty input admitted.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ReviewForm;