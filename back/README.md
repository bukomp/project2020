# Back-end

- [Server configuration](##Configuration)
- [API](##API)

## Configuration

---

Server config should be saved in `.env` file in back-end root.<br>
File should contain:

| key               | value  |
| ----------------- | ------ |
| PORT              | number |
| DB_URL            | string |
| SECRET            | string |
| TOKEN_ALIVE_HOURS | number |

## API

---

### API Map

[/login](###login)<br>
[/register](###register)<br>
[/user](###user)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/](####userData)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/update](####userUpdate)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/cars](####userCars)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/events](####userEvents)<br>
[/car](###car)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/create](####createCar)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (read)](####:idOfCarToFetch)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (update)](####:idOfCarToUpdate)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (delete)](####:idOfCarToDelete)<br>
[/event](###event)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/create](####createEvent)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (read)](####:idOfEventToFetch)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (update)](####:idOfEventToUpdate)<br>
&nbsp;&nbsp;&nbsp;&nbsp;[/:id (delete)](####:idOfEventToDelete)<br>

### Documentation

- ### login

  - ##### HTTP request type
    POST
  - ##### headers
    | keys          | type   | required |
    | ------------- | ------ | -------- |
    | Authorization | string | false    |
  - ##### query
    _none_
  - ##### body

    | keys     | type           | minLength | required |
    | -------- | -------------- | --------- | -------- |
    | username | string         | 0         | \*true   |
    | email    | string (email) | 0         | \*true   |
    | password | string         | 0         | true     |

    \*Requires one of username or email

  - #### returns

    | keys  | type   |
    | ----- | ------ |
    | token | string |

- ### register

  - ##### HTTP request type
    POST
  - ##### headers
    _none_
  - ##### query
    _none_
  - ##### body
    | keys      | type           | minLength | required |
    | --------- | -------------- | --------- | -------- |
    | username  | string         | 3         | true     |
    | firstName | string         | 0         | true     |
    | lastName  | string         | 0         | true     |
    | email     | string (email) | 0         | true     |
    | password  | string         | 3         | true     |
  - ##### returns
    | keys  | type   |
    | ----- | ------ |
    | token | string |

- ### user

  - #### userData

    - ##### HTTP request type
      GET
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | user  | User   |

  - #### userUpdate

    - ##### HTTP request type
      PUT
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      | keys            | type           | minLength | required |
      | --------------- | -------------- | --------- | -------- |
      | currentPassword | string         | 0         | true     |
      | points          | number         | 0         | false    |
      | co2             | number         | 0         | false    |
      | username        | string         | 3         | false    |
      | firstName       | string         | 0         | false    |
      | lastName        | string         | 0         | false    |
      | email           | string (email) | 0         | false    |
      | password        | string         | 3         | false    |
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | user  | User   |

  - #### userCars

    - ##### HTTP request type
      GET
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | cars  | Car[]  |

  - #### userEvents

    - ##### HTTP request type
      GET
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys   | type    |
      | ------ | ------- |
      | token  | string  |
      | events | Event[] |

- ### car

  - #### createCar

    - ##### HTTP request type
      POST
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      | keys               | type   | minLength | required |
      | ------------------ | ------ | --------- | -------- |
      | fuelType           | enum   | 0         | true     |
      | carType            | enum   | 0         | true     |
      | registrationNumber | string | 3         | true     |
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | car   | Car    |

  - #### :idOfCarToFetch

    - ##### HTTP request type
      GET
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | car   | Car    |

  - #### :idOfCarToUpdate

    - ##### HTTP request type
      PUT
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      | keys               | type   | minLength | required |
      | ------------------ | ------ | --------- | -------- |
      | fuelType           | enum   | 0         | false    |
      | carType            | enum   | 0         | false    |
      | registrationNumber | string | 3         | false    |
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | car   | Car    |

  - #### :idOfCarToDelete

    - ##### HTTP request type
      DELETE
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |

- ### event

  - #### createEvent

    - ##### HTTP request type
      POST
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      | keys       | type        | minLength | required |
      | ---------- | ----------- | --------- | -------- |
      | date       | EventDate   | 0         | true     |
      | type       | enum        | 0         | true     |
      | car        | string (id) | 0         | false    |
      | checkpoint | string (id) | 0         | false    |
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | event | Event  |

  - #### /:idOfEventToFetch

    - ##### HTTP request type
      GET
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      | keys     | type    | required | description                                                                      |
      | -------- | ------- | -------- | -------------------------------------------------------------------------------- |
      | exploded | boolean | false    | If true returns event with array of checkpoint objects (not only checkpoint ids) |
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | event | Event  |

  - #### /:idOfEventToUpdate

    - ##### HTTP request type
      PUT
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      | keys       | type      | minLength | required |
      | ---------- | --------- | --------- | -------- |
      | date       | EventDate | 0         | false    |
      | tripLength | number    | 0         | false    |
      | points     | number    | 0         | false    |
      | co2        | number    | 0         | false    |
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | event | Event  |

  - #### /:idOfEventToDelete

    - ##### HTTP request type
      DELETE
    - ##### headers
      | keys          | type   | required |
      | ------------- | ------ | -------- |
      | Authorization | string | true     |
    - ##### query
      _none_
    - ##### body
      _none_
    - ##### returns
      | keys  | type   |
      | ----- | ------ |
      | token | string |
      | event | Event  |
