<br />
<div align="center">
    <img src="./assets/BetterNotes-logo.png" alt="Logo" width="80" height="80">
  <h3 align="center">BetterNotes</h3>

  <p align="center">
    Transforming the way we interact with information!
    <br />
    <a href=https://www.youtube.com/watch?v=ALFtZPulHMM&ab_channel=LensonLim"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Lebarnon/BetterNotesServer">Server Repo</a>
    ·
    <a href="https://github.com/Lebarnon/BetterNotesApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/Lebarnon/BetterNotesApp/issues">Request Feature</a>
  </p>
</div>

#
# About
BetterNotes is a Software as a Service (SaaS) application designed to transform the way we interact with information. With BetterNotes, you can effortlessly input new information into a personalized AI chatbot, creating a digital companion that adapts to your needs. Moreover, the platform allows you to organize your information into separate collections, streamlining your data management process. Think of it as your digital library, where you can upload documents and “talk” to them.

# Technology Stack:
<img src="./assets/BetterNotes-archi.png" alt="architecture">

**Frontend:** <br>
Nuxt.js + Typescript


**Backend:** <br>
-Databases: Firebase (Firestore, Storage) + Pinecone<br>
-Serverless Compute Service: Firebase Function<br>
-LLM Framework: LangChain<br>
-LLM: OpenAI<br>

### Layer 1: NuxtJS and the three Firebase Services
Nuxt.js is a popular framework for building web applications, particularly for creating server-rendered Vue.js applications. Its the Next.js equivalent in React. It builds upon Vue.js and provides several additional benefits and features that can streamline development and improve the performance of your web applications. Some of these benefits include:

Server-Side Rendering (SSR) |
Automatic Routing |
Pre-fetching and Pre-rendering |
Layouts and Views |
Middleware |
Vue Router |
Async Data Fetching |
Plugin System |
Static Site Generation (SSG)

While Typescript complements NuxtJS by providing:

Type Safety |
Code Predictability |
Better Collaboration |
Enhanced Tooling

In my previous project [NTUStars](https://github.com/Lebarnon/NTUStars) I talked about how I should have used Typescript and boy was I right. Programming in Typescript provided a much better development experience.

For this layer, the app interacts with three main backend services: **Firebase Authentication**, **Firebase Storage** and **Firestore**

Firebase Authentication provides auth state changes to Nuxt which then reacts according.

Firebase Storage allows users to upload files to the cloud

Firestore lastly allows users to create Collections and Documents but only under their directory which ensures security. Furthermore, Nuxt subscribes to certain collection and documents which listen for changes in them and updates the frontend according. The chat messages are great examples of this model. 

### Layer 2: Firebase Function as a background worker
Firebase Functions are designed to run serverless, event-driven code in response to various types of triggers such as HTTP requests, database changes, and more. In our case, it responses to 2 main triggers: <br>
<ol>
<li>
Document Upload
</li>
Whenever a document gets uploaded to a cloud storage bucket by a user, a Firebase Function will be triggered by this upload and proceeds to execute. The function main job is to extract text from documents via <strong>text extraction</strong>, <strong>Google's Document AI</strong> (coming soon), <strong>OpenAI's Whisper Model</strong> (coming soon)
<br>
The extracted text will then undergo <strong>Layer 3: Case 1</strong> to generate vector emeddings Ids.
<br>
Finally, the resulting text and vector embeddings ids will be stored in the appropriate document in Firestore.<br><br>

<li>
New Message Creation
</li>
When a user asks a question, a new document with the question is created under that particular user's document. This triggers a firebase functions that will execute Case 2 in <strong>Layer 3: Case 2</strong>
</ol>

### Layer 3: LLM Service Layer

**Case 1: Processing Document**<br>
After extracting content from documents, vector embeddings will be generated in batches using OpenAI's API through <strong>LangChain</strong>. The resulting vectors will then be stored in a <strong>Pinecone</strong> vector database along with other metadata for easy identification of owner's identity and information like the source.

**Case 2: Generating Response** <br>
Generating a response from a query is as follows:
<ol>
<li>Vector Embeddings of the query will be generated using OpenAI's API</li>
<li>Vector Embeddings used to query the top k matches from the user's allocated segment in the Pinecone database.</li>
<li>The top k matches will be prepended to the actual question asked by the user and a request will be sent to ChatGPT</li>
<li>The response will be stored in the appropriate document in Firebase</li>
<li>The User who should be subscribed to document will recieve the update and the answer will be reflected on the frontend</li>
</ol>


# Conclusion
Currently, I'm actively working on making this more robust before releasing this to the public. Hence, if BetterNotes resonates with you or you're interested in exploring potential collaborations, feel free to reach out!
 