execute = (server, chai, expect, should) => {
    // test the GET ALL departments endpoint
    describe("GET ALL departments endpoint", () => {
        // should pass
        it("It should GET all departments", (done) => {
            chai.request(server)
                .get("/depts")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.greaterThan(0);
                    done();
                });
        });

        // should fail
        it("It should not GetById departments", (done) => {
            chai.request(server)
                .get("/dept")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    // test the GET by Id endpoint
    describe("GET department by ID endpoint", () => {
        // should pass
        it("It should return the department with the ID of 1", (done) => {
            chai.request(server)
                .get("/depts/1")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('description');
                    response.body.should.have.property('id').eq(1);
                    done();
                });
        });

        // should fail
        it("It should fail to return the department with the ID of 1 as ID 100 does not exist", (done) => {
            chai.request(server)
                .get("/depts/100")
                .end((error, response) => {
                    response.should.have.status(400); // request is accepted but nothing returns
                    done();
                });
        });
    });

    // test the POST endpoint
    describe("POST department endpoint", () => {
        // should pass
        it("It should successfully create the department", (done) => {
            const department = {
                name: "Finance",
                description: "This department will handle all corporate financials"
            };

            chai.request(server)
                .post("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq('Finance');
                    response.body.should.have.property('description').eq('This department will handle all corporate financials');
                    done();
                });
        });

        // should fail - name not set
        it("It should fail as no name has been given", (done) => {
            const department = {
                description: "This is a test description"
            }

            chai.request(server)
                .post("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - description not set
        it("It should fail as no description has been given", (done) => {
            const department = {
                name: "Test name"
            };

            chai.request(server)
                .post("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    })

    // test the DELETE endpoint
    describe("DELETE department endpoint", () => {
        // should pass
        it("It should successfully delete the department", (done) => {
            const id = { id: 9 };

            chai.request(server)
                .delete("/depts")
                .send(id)
                .end((error, response) => {
                    response.should.have.status(200);
                    done();
                });
        });

        // should fail
        it("It should fail as no department with this ID exists", (done) => {
            const id = { id: 100 };

            chai.request(server)
                .delete("/depts")
                .send(id)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail
        it("It should fail as the department ID given is alphabetical", (done) => {
            const id = { id: 'a' };

            chai.request(server)
                .delete("/depts")
                .send(id)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    // test the PUT endpoint
    describe("PUT department endpoint", () => {
        // should pass
        it("It should pass as all fields have been completed", (done) => {
            const department = {
                id: 8,
                name: "This is a test update",
                description: "This is a test update description"
            };

            chai.request(server)
                .put("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(8);
                    response.body.should.have.property('name').eq('This is a test update');
                    response.body.should.have.property('description').eq('This is a test update description');
                    done();
                });
        });

        // Should fail - ID does not exist
        it("It should fail as there is no department with that ID", (done) => {
            const department = {
                id: 100,
                name: "This is a test update",
                description: "This is a test description"
            };

            chai.request(server)
                .put("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                })
        })

        // should fail
        it("It should fail as the id field is missing", (done) => {
            const department = {
                name: "This is a test name",
                description: "This is a test description"
            };

            chai.request(server)
                .put("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail
        it("It should fail as the name field is missing", (done) => {
            const department = {
                id: 8,
                description: "This is a test description"
            };
            
            chai.request(server)
                .put("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("It should fail as the description field is missing", (done) => {
            const department = {
                id: 8,
                name: "This is a test name"
            };

            chai.request(server)
                .put("/depts")
                .send(department)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    });
}

module.exports = { execute }