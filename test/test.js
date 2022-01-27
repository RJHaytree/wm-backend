let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

let departmentTest = require('./departmentTest');
let workstationTest = require('./workstationTest')

var expect = chai.expect;
var should = chai.should();

chai.use(chaiHttp);

departmentTest.execute(server, chai, expect, should);
workstationTest.execute(server, chai, expect, should);