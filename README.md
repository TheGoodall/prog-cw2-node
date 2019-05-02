# Food! - Documentation!

## Peer assesment:

This copy of the server is missing the secret, this means it cannot communicate with the external api (auth0), this means that some feature will not work. for a fully working version see the cloud deployment

An account for testing purposes is provided: 

Username: test@test.com

Password: Test1234

## Cloud deployment

The cloud deployment can be found at [frizlette.me](http://frizlette.me)

## API Documentation

All requests use the bearer authentication scheme, where the Authorization header must containt: "Bearer \<access token\>"


### GET Requests:

### Groups

#### By User

`/api/groups/byUser/<userid>`

returns an array of group names in json format

### Users

#### By Group

`/api/users/byGroup/<groupid>`

returns an array in the form:

```javascript
[[user1, admin], [user2, admin], ...]
```

#### By Query

`/api/users/byQuery/<query>`

returns an array of user profiles that match the query

#### By id

`/api/users/byid/<userid>`

returns a profile of the user

### Transactions

`/api/transactions/byGroup/<groupid>`

returns an array of transactions in a group

### POST Requests:

### Groups

#### Add User

`/api/group/addUser/<groupid>/<userid>`

adds a user to a group

returns 404 if the user or group are not found, 409 if the user is already in the group, and 403 if the authenticated user is not an admin in the group

#### Remove User

`/api/groups/removeUser/<groupid>/<userid>`

removes a user from a group

returns 404 if the user or group are not found, 403 if the authenticated user is not an admin or is trying to remove themselves

#### Make Admin

`/api/groups/makeAdmin/<groupid>/<userid>/<admin>`

sets the admin state of a user in a group to that of the admin parameter

returns 403 if the authenticated user is not an admin, 404 if the user or group do not exist

### Transactions

`/api/transactions/newTransaction/<groupid>/<userid>/<value>`

adds a new transaction

returns 400 if the value is NaN, 404 if the group is not valid, 403 if the authenticated user is attempting to add a user for someone else, and 404 if the user does not exist