# hisonjs

[![npm version](https://badge.fury.io/js/hisonjs.svg)](https://badge.fury.io/js/hisonjs)  
**hisonjs** is a client-side library that serves as a core module for the **hisondev** solution. It provides utilities, security enhancements, data modeling, and API communication support. This library becomes even more powerful when used with **hisonjv**, a Java library for Spring-based applications.

---

## Features
- **Dynamic Configuration**: Configure global settings through `hison` methods like `setProtocol` and `setDateFormat`.
- **Security Module**: Harden your application using `hison.shield.execute()`, which provides multiple layers of protection.
- **Data Modeling**: Create and manipulate structured data using `DataModel` and `DataWrapper`.
- **API Communication**: Utilize `CachingModule` and `ApiPost` for efficient and promise-based API communication.

---

## Installation

Install `hisonjs` via npm:

```bash
npm install hisonjs
```

---

## Usage Overview

### Step 1: Configure `hison`
Before using any features, configure the `hison` object to match your application's requirements.

```typescript
import hison from "hisonjs";

hison.setProtocol("https://");
hison.setDateFormat("yyyy-MM-dd");
hison.setExposeIpList(["192.168.1.1", "10.0.0.2"]);
```

### Step 2: Strengthen Security
Execute the security module to enhance application protection.

```typescript
hison.shield.execute(hison);
```

### Step 3: Utilize `hison` Modules
You can use `hison.util`, `hison.data`, and `hison.link` to manage data, validate values, and communicate with your backend.

---

## Examples

### 1. Utility Functions (`hison.util`)
Use `hison.util` to format dates, validate strings, and perform various utility operations.

```typescript
const formattedDate = hison.util.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
console.log("Formatted Date:", formattedDate);

const isAlpha = hison.util.isAlpha("HelloWorld");
console.log("Is Alpha:", isAlpha);
```

---

### 2. Data Modeling (`hison.data`)
Use `hison.data` to create structured data models for seamless communication between front-end and back-end.

```typescript
const dataModel = new hison.data.DataModel();
dataModel.setColumns(["name", "age"]);
dataModel.addRow({ id: 1, name: "Alice" });
console.log(dataModel.getObject());
```

---

### 3. API Communication (`hison.link`)
Perform API calls with `CachingModule` and `ApiPost`.

```typescript
const cachingModule = new hison.link.CachingModule();
const post = new hison.link.ApiPost("MemberService.getMember", cachingModule);

const dataWrapper = new hison.data.DataWrapper();
dataWrapper.add("memberId", 123);

post.call(dataWrapper).then(result => {
  console.log("API Response:", result.data);
}).catch(error => {
  console.error("API Error:", error);
});
```

---

## Full Initialization Example

```typescript
import hison from "hisonjs";

// Step 1: Configure hison
hison.setProtocol("https://");
hison.setDatetimeFormat("yyyy-MM-dd HH:mm:ss");

// Step 2: Execute security module
hison.shield.execute(hison);

// Step 3: Use utility functions, data models, and API communication
const formattedDate = hison.util.formatDate(new Date(), "yyyy-MM-dd");
console.log(formattedDate);

const dataModel = new hison.data.DataModel();
dataModel.setColumns(["id", "name"]);
dataModel.addRow({ id: 1, name: "Alice" });

const apiPost = new hison.link.ApiPost("UserService.getUser");
apiPost.call(new hison.data.DataWrapper("select", dataModel)).then(response => console.log(response.data));
```

---

## Repository & Issues

- **Repository**: [GitHub - hisonjs](https://github.com/hisondev/hisonjs)  
- **Report Issues**: [GitHub Issues](https://github.com/hisondev/hisonjs/issues)

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Author

**Hani Son**  
[GitHub Profile](https://github.com/hisondev)