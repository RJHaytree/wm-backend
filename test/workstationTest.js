execute = (server, chai, expect, should) => {
    // Test GET all workstation endpoint
    describe("Get ALL workstations endpoint", () => {
        // should pass
        it("It should GET all workstations", (done) => {
            chai.request(server)
                .get("/works")
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.greaterThan(0);
                    done();
                });
        })

        // should fail
        it("It should fail to get all workstations", (done) => {
            chai.request(server)
                .get("/work")
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    // Test GET by ID workstation endpoint
    describe("Get workstation by ID endpoint", () => {
        // should pass
        it("It should GET a department using an ID", (done) => {
            let id = 1;

            chai.request(server)
                .get("/works/" + id)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('type');
                    response.body.should.have.property('ip_address');
                    response.body.should.have.property('cpu');
                    response.body.should.have.property('motherboard');
                    response.body.should.have.property('ram');
                    response.body.should.have.property('hdd');
                    response.body.should.have.property('ssd');
                    response.body.should.have.property('conn_type');
                    response.body.should.have.property('department_id');
                    done();
                });
        });

        // should fail
        it("It should fail to GET a department using the ID", (done) => {
            let id = 100;

            chai.request(server)
                .get("/works/" + id)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });

    // Test GET by Department workstation endpoint
    describe("GET workstations by department endpoint", () => {
        // should pass
        it("It should GET the workstations for a specific department", (done) => {
            let department_id = 2;

            chai.request(server)
                .get("/works/depts/" + department_id)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.eq(5);
                    done();
                });
        });

        // should fail
        it("It should fail to GET the workstations for a specific department", (done) => {
            let department_id = 100;

            chai.request(server)
                .get("/works/depts/" + department_id)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                })
        })
    });

    // Test POST workstation endpoint
    describe("POST workstation endpoint", () => {
        // should pass
        it("It should POST a new workstation", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq('Test laptop');
                    response.body.should.have.property('type').eq('laptop');
                    response.body.should.have.property('ip_address').eq('192.168.1.123');
                    response.body.should.have.property('cpu').eq('Intel i3 6100');
                    response.body.should.have.property('motherboard').eq('N/A');
                    response.body.should.have.property('ram').eq('4GB');
                    response.body.should.have.property('hdd').eq('500GB');
                    response.body.should.have.property('ssd').eq(0);
                    response.body.should.have.property('conn_type').eq('Wireless');
                    response.body.should.have.property('department_id').eq(1);
                    done();
                });
        });

        // should fail - name
        it("It should not POST a new workstation (Name constraint)", (done) => {
            const workstation = {
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - type
        it("It should not POST a new workstation (Type constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - ip address
        it("It should not POST a new workstation (IP address constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - cpu
        it("It should not POST a new workstation (CPU constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };  

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });  
        });

        // should fail - motherboard
        it("It should not POST a new workstation (Motherboard constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                }); 
        });

        // should fail - ram
        it("It should not POST a new workstation (RAM constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - hdd
        it("It should not POST a new workstation (HDD constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                ssd: 0,
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - ssd
        it("It should not POST a new workstation (SSD constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                conn_type: "Wireless",
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - conn type
        it("It should not POST a new workstation (Conn Type constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                department_id: 1
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });

        // should fail - department ID
        it("It should not POST a new workstation (Department ID constraint)", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: 0,
                conn_type: "Wireless"
            };

            chai.request(server)
                .post("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    })

    // Test DELETE workstation endpoint
    describe("DELETE workstation endpoint", () => {
        // should pass
        it("It should successfully delete the workstation", (done) => {
            const id = { id: 36 };

            chai.request(server)
                .delete("/works")
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
                .delete("/works")
                .send(id)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail
        it("It should fail as the ID given is alphabetical", (done) => {
            const id = { id: 'a' };

            chai.request(server)
                .delete("/works")
                .send(id)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    // Test PUT workstation endpoint
    describe("PUT workstation endpoint", () => {
        // should pass
        it("It should pass as all fields have been completed", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq('Test laptop');
                    response.body.should.have.property('type').eq('laptop');
                    response.body.should.have.property('ip_address').eq('192.168.1.123');
                    response.body.should.have.property('cpu').eq('Intel i3 6100');
                    response.body.should.have.property('motherboard').eq('N/A');
                    response.body.should.have.property('ram').eq('4GB');
                    response.body.should.have.property('hdd').eq('500GB');
                    response.body.should.have.property('ssd').eq('512GB');
                    response.body.should.have.property('conn_type').eq('Wireless');
                    response.body.should.have.property('department_id').eq(8);
                    done();
                });
        });

        // should fail - Id does not exist
        it("It should fail as that workstation ID does not exist", (done) => {
            const workstation = {
                id: 100,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - ID
        it("It should fail as the ID field is missing", (done) => {
            const workstation = {
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - name
        it("It should fail as the name field is missing", (done) => {
            const workstation = {
                id: 35,
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - type
        it("It should fail as the type field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - ip address
        it("It should fail as the IP address field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - cpu
        it("It should fail as the cpu field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - motherboard
        it("It should fail as the motherboard field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - ram
        it("It should fail as the ram field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - hdd
        it("It should fail as the hdd field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - ssd
        it("It should fail as the ssd field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                conn_type: "Wireless",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - conn type
        it("It should fail as the conn type field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                department_id: 8
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - department ID
        it("It should fail as the department ID field is missing", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless"
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        // should fail - department ID does not exist
        it("It should fail as the department ID field does not exist", (done) => {
            const workstation = {
                id: 35,
                name: "Test laptop",
                type: "laptop",
                ip_address: "192.168.1.123",
                cpu: "Intel i3 6100",
                motherboard: "N/A",
                ram: "4GB",
                hdd: "500GB",
                ssd: "512GB",
                conn_type: "Wireless",
                department_id: 100
            };

            chai.request(server)
                .put("/works")
                .send(workstation)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        })
    })
}

module.exports = { execute }