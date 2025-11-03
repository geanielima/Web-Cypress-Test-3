describe('Backend API Tests', () => {
    const apiBase = 'https://api.restful-api.dev/objects'

    it('should list all devices - GET /objects', () => {
        cy.log('Testing GET list all devices endpoint')
        cy.request('GET', apiBase).then((response) => {
            cy.log('Response received for GET /objects')
            expect(response.status).to.eq(200)
            cy.log('Verifying response body is an array')
            expect(response.body).to.be.an('array')
            cy.log(`Checking number of devices returned: ${response.body.length}`)
            expect(response.body.length).to.be.greaterThan(0)
        })
    })

    it('should list a specific range of devices - GET /objects?id=3&id=10', () => {
        cy.log('Testing GET list devices in range endpoint')
        cy.request('GET', `${apiBase}?id=3&id=4&id=5&id=6&id=7&id=8&id=9&id=10`).then((response) => {
            cy.log('Response received for GET /objects with ID range')
            expect(response.status).to.eq(200)
            cy.log('Verifying response body for correct devices in range')
            expect(response.body).to.be.an('array')
            cy.log('Checking that 8 devices are returned')
            expect(response.body).to.have.length(8) // Should return 8 devices (3,4,5,6,7,8,9,10)
            response.body.forEach((device: { id: number; name: string }) => {
                cy.log(`Verifying device with ID: ${device.id}`)
                expect(device).to.have.property('id')
                cy.log(`Verifying device name: ${device.name}`)
                expect(device).to.have.property('name')
                cy.log('Verifying device ID is within expected range and converted to number')
                const deviceId = parseInt(device.id.toString())
                expect(deviceId).to.be.within(3, 10)
            })
        })
    })

    it('should get a device by ID - GET /objects/7', () => {
        const deviceId = 7
        cy.log('Testing GET device by ID endpoint')
        cy.request('GET', `${apiBase}/${deviceId}`).then((response) => {
            cy.log('Response received for GET /objects/7')
            expect(response.status).to.eq(200)
            cy.log('Verifying response body contains correct device ID and name')
            expect(response.body).to.have.property('id', deviceId.toString())
            expect(response.body).to.have.property('name')
        })
    })

    it('Create device then update specific field - POST + PATCH', () => {
        
        cy.log('Creating a new device to test PATCH update')
        const createPayload = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
        
        cy.log('Sending POST request to create device')
        cy.request({
            method: 'POST',
            url: apiBase,
            body: createPayload,
            headers: { 'Content-Type': 'application/json' }
        }).then((createResp) => {
            expect(createResp.status).to.be.oneOf([201, 200])
            expect(createResp.body).to.have.property('id')
            
            const deviceId = createResp.body.id
            
            cy.log(`Device created with ID: ${deviceId}, proceeding to PATCH update`)
            cy.request({
                method: 'PATCH',
                url: `${apiBase}/${deviceId}`,
                body: { name: 'Apple MacBook Pro 16 (Updated Name)' },
                headers: { 'Content-Type': 'application/json' }
            }).then((patchResp) => {
                expect(patchResp.status).to.be.oneOf([200, 204])
                
                cy.log('Verifying PATCH response body for updated name if available')
                if (patchResp.body && Object.keys(patchResp.body).length) {
                    expect(patchResp.body.name).to.equal('Apple MacBook Pro 16 (Updated Name)')
                }

                cy.log('Confirming device update via GET request')
                cy.request('GET', `${apiBase}/${deviceId}`).then((getResp) => {
                    expect(getResp.status).to.eq(200)
                    expect(getResp.body.name).to.equal('Apple MacBook Pro 16 (Updated Name)')
                })
            })
        })
    })

    it('Create a new device - POST /objects', () => {
        cy.log('Creating a new device via POST /objects')
        const payload = {
            name: 'Apple MacBook Pro 2025',
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
        cy.log('Sending POST request to create device')
        cy.request({
            method: 'POST',
            url: apiBase,
            body: payload,
            headers: { 'Content-Type': 'application/json' }
        }).then((resp) => {
            expect(resp.status).to.be.oneOf([201, 200])
            expect(resp.body).to.have.property('id')
            cy.wrap(resp.body.id).as('createdId')
        })
    })

    it('Create device then update all fields - POST + PUT', () => {
        cy.log('Creating a new device to test PUT update')
        const createPayload = {
            name: 'Device for PUT test',
            data: {
                year: 2020,
                price: 1000.00,
                "CPU model": "Test CPU",
                "Hard disk size": "500 GB"
            }
        }
        
        cy.log('Sending POST request to create device')
        cy.request({
            method: 'POST',
            url: apiBase,
            body: createPayload,
            headers: { 'Content-Type': 'application/json' }
        }).then((createResp) => {
            expect(createResp.status).to.be.oneOf([201, 200])
            const deviceId = createResp.body.id
            
            cy.log(`Device created with ID: ${deviceId}, proceeding to PUT update`)
            const putPayload = {
                name: 'Apple MacBook Pro 16',
                data: {
                    year: 2019,
                    price: 2049.99,
                    "CPU model": "Intel Core i9",
                    "Hard disk size": "1 TB",
                    color: "silver"
                }
            }
            
            cy.log('Sending PUT request to update device')
            cy.request({
                method: 'PUT',
                url: `${apiBase}/${deviceId}`,
                body: putPayload,
                headers: { 'Content-Type': 'application/json' }
            }).then((putResp) => {
                expect(putResp.status).to.be.oneOf([200, 204])
            })
        })
    })

    it('Register a device and then delete it (create + delete) - POST then DELETE', function () {
        cy.log('Creating a new device to test DELETE operation')
        const payload = {
            name: 'Temp Device For Deletion',
            data: { year: 2025, price: 1.0, "CPU model": "test", "Hard disk size": "0 GB" }
        }
        cy.log('Sending POST request to create device')
        cy.request('POST', apiBase, payload).then((postResp) => {
            expect(postResp.status).to.be.oneOf([201, 200])
            const id = postResp.body.id
            cy.log(`Device created with ID: ${id}, proceeding to DELETE operation`)
            cy.request('DELETE', `${apiBase}/${id}`).then((delResp) => {
                expect(delResp.status).to.be.oneOf([200, 204])
            })
        })
    })
})