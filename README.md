# hisonjs

More detailed information can be found on the this.
[Homepage](https://hisondev.github.io/)

[![npm version](https://badge.fury.io/js/hisonjs.svg)](https://badge.fury.io/js/hisonjs)

**hisonjs** is a powerful client-side library designed to be used with the **hisondev** backend solution for Java Spring. It provides robust utilities, security enhancements, structured data modeling, and API communication modules. 

> ✨ hisonjs is **perfectly compatible** with the following Java libraries published on Maven Central:
> - [**hisonjv**](https://mvnrepository.com/artifact/io.github.hisondev/hisonjv)
> - [**data-model**](https://mvnrepository.com/artifact/io.github.hisondev/data-model)
> - [**api-link**](https://mvnrepository.com/artifact/io.github.hisondev/api-link)

---

## 🔍 Key Features

- **✨ Dynamic Configuration**: Flexibly modify global behavior using easy `hison.setXXX()` methods.
- **🔐 Security Module**: Protect your app with `hison.shield.excute()` ➔ prevents unauthorized dev tools, URL/IP access restrictions, object immutability, etc.
- **📊 Data Modeling**: Use `DataModel` and `DataWrapper` to structure and validate frontend data just like **hisonjv's** `data-model` backend.
- **🚜 API Communication**: Seamlessly interact with **api-link**-based Spring backend via `ApiPost`, `ApiGet`, and built-in caching (`CachingModule`).
- **🤖 Custom Hooks**: Control API request/response lifecycle with pre/post hook functions.
- **📢 Real-Time WebSocket Support**: Automatically handle real-time updates through caching modules.

---

## 🔧 Installation

```bash
npm install hisonjs
```

---

## 🔐 Java Spring Backend Integration

hisonjs is **designed to work directly** with your Java backend using:

### 🔹 hisonjv (Artifacts including all hisondev artifacts such as data-model and api-link)
```xml
<dependency>
    <groupId>io.github.hisondev</groupId>
    <artifactId>hisonjv</artifactId>
    <version>1.0.3</version>
</dependency>
```

### 🔹 data-model (Data Communication: DataWrapper, DataModel)
```xml
<dependency>
    <groupId>io.github.hisondev</groupId>
    <artifactId>data-model</artifactId>
    <version>1.0.7</version>
</dependency>
```

### 🔹 api-link (API Communication Simplification)
```xml
<dependency>
    <groupId>io.github.hisondev</groupId>
    <artifactId>api-link</artifactId>
    <version>1.0.7</version>
</dependency>
```

---

## 📚 Usage Overview

### Step 1: Basic Setup
```typescript
import hison from "hisonjs";

hison.setProtocol("https://");
hison.setDateFormat("yyyy-MM-dd");
hison.setExposeIpList(["192.168.1.1", "10.0.0.2"]);
```

### Step 2: Enforce Security
```typescript
hison.shield.excute(hison);
```

### Step 3: Start Using Modules
- **Utilities**: `hison.utils`
- **Data Management**: `hison.data`
- **API Communication**: `hison.link`

---

## 📖 Examples

### ✅ Utility Functions
```typescript
const isAlpha = hison.utils.isAlpha("HelloWorld");
console.log(isAlpha); // true

const dateStr = hison.utils.getDateWithFormat(new Date(), "yyyy-MM-dd");
console.log(dateStr);
```

### 📚 Data Modeling
```typescript
const wrapper = new hison.data.DataWrapper({ username: "Alice" });
console.log(wrapper.getString("username")); // "Alice"

const model = new hison.data.DataModel([{ id: 1, name: "Alice" }]);
console.log(model.getValue(0, "name")); // "Alice"
```

### 🚜 API Communication (With API-Link Backend)
```typescript
const apiPost = new hison.link.ApiPost("UserService.createUser");
const requestData = new hison.data.DataWrapper({ username: "Alice" });

apiPost.call(requestData).then(response => {
  console.log("API Response:", response.data);
});
```

### 🔄 Real-Time Caching + WebSocket Updates
```typescript
const cachingModule = new hison.link.CachingModule(20);
const apiGet = new hison.link.ApiGet("/users", cachingModule);

apiGet.call().then(response => {
  console.log("Fetched users:", response.data);
});
```

---

## 🔒 Core Concepts

- ✔️ **Closure Encapsulation**: `hison` internally wraps `HisonCore` using closures for maximum security and immutability.
- ✔️ **Customizable Defaults**: Modify byte rules, datetime formats, hook functions, API protocols dynamically.
- ✔️ **Direct Compatibility with Java Side**: DataWrapper and DataModel instances serialize/deserialize cleanly across frontend (hisonjs) and backend (hisonjv/data-model).
- ✔️ **WebSocket Endpoint Management**: Real-time data updates through the cache layer for scalable apps.

---

## 🎓 Full Initialization Example
```typescript
import hison from "hisonjs";

// Setup
hison.setProtocol("https://");
hison.setDatetimeFormat("yyyy-MM-dd HH:mm:ss");

// Enforce security
hison.shield.excute(hison);

// Use utilities
console.log(hison.utils.getSysDate());

// Build DataModel
const model = new hison.data.DataModel([{ id: 1, name: "Alice" }]);

// Send API Request
const apiPost = new hison.link.ApiPost("UserService.getUser");
apiPost.call(new hison.data.DataWrapper({ userId: 1 })).then(response => {
  console.log(response.data);
});
```

---

## 🔗 Repository & Issues

- **Repository**: [GitHub - hisonjs](https://github.com/hisondev/hisonjs)
- **Report Issues**: [GitHub Issues](https://github.com/hisondev/hisonjs/issues)

---

## 💻 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💼 Author

**Hani Son**  
[GitHub Profile](https://github.com/hisondev)

---

> ✨ If you are building a fullstack Spring + TypeScript project and want the most streamlined data/API layer ➔ **hisonjs + hisonjv** is your perfect choice!
