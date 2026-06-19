<a id="readme-top"></a>

<br />
<div align="center">
  <img width="1680" height="200" alt="Banner" src="https://github.com/user-attachments/assets/7a4815da-bbc8-4ccc-be71-1e438676a942" />
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project
Reflexia is an AI-assisted reflection system developed as my Final Year Project and described in a CHI '26 Extended Abstract:

> Sofiia Mamonova and Brennan Jones. 2026. Reflexia: AI-Assisted Reflection on Personal Media Consumption. In Proceedings of the Extended Abstracts of the 2026 CHI Conference on Human Factors in Computing Systems (CHI EA '26). Association for Computing Machinery, New York, NY, USA, Article 556, 1–6. https://doi.org/10.1145/3772363.3798688

The system analyzes users' YouTube watch history to identify emotional and thematic patterns in media consumption, and based on this analysis, produces AI-generated imagery and textual summaries to help users better understand their viewing habits. Reflexia also includes a conversational agent that guides users through reflection sessions structured around Gibbs' Reflective Cycle, helping them connect and align their media consumption with their personal well-being goals and needs.

<img width="1409" height="1591" alt="Screenshots" src="https://github.com/user-attachments/assets/7d557dce-e415-4adb-ace5-1d3a773d307f" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![TS][TypeScript]][TypeScript-url]
[![HTML][HTML5]][HTML5-url]
[![CSS][CSS3]][CSS3-url]
[![Fast][FastAPI]][FastAPI-url]
[![React][React.js]][React-url]
[![Mongo][MongoDB]][Mongo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites
#### 1. [Node.js (v18+) and npm](https://nodejs.org/)

#### 2. [Python (v3.10+)](https://www.python.org/downloads/)

#### 3. [MongoDB](https://www.mongodb.com/docs/manual/installation/)
* Create an account -> New project -> Create cluster -> Connect

#### 4. [Git](https://git-scm.com/)

#### 5. API Keys and other
* [OpenAI API Key](https://platform.openai.com/api-keys)
Sign up/log in -> API Keys -> Create new secret key

* [YouTube Data API Key and Google OAuth Client ID](https://console.cloud.google.com/)
Create a project -> Enable YouTube Data API v3 (in APIs & Services > Library) -> Create credentials (in APIs & Services > Credentials)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/slooonya/Reflexia.git
```

#### 2. Navigate to the project directory
```bash
cd Reflexia
```

#### 3. Set up the backend
* Navigate to the server folder:
```bash
cd server
```

* Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

* Install the packages required for the app:
```bash
pip install -r requirements.txt
```

* Open the .env file and configure the environment variables

* Start the backend:
```bash
python3 run.py # Mac/Linux
python run.py  # Windows
```

* Open your browser and navigate to http://localhost:8000

#### 4. Set up the frontend
* Navigate to the client folder:
```bash
cd client
```

* Install NPM packages:
```bash
npm install
```

* Start the frontend:
```bash
npm run dev
```

* In your browser, navigate to http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Sonya's email address: snmmnva@gmail.com

Project Link: [https://github.com/slooonya/Reflexia](https://github.com/slooonya/Reflexia)

<img width="1680" height="200" alt="Footer" src="https://github.com/user-attachments/assets/2b639cc8-373e-4cef-a6a9-947f9ab55e82" />
<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/

[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white 
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML

[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[FastAPI]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[FastAPI-url]: https://fastapi.tiangolo.com/
