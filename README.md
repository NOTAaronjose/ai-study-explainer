# 🧠 AI Study Explainer

Turn complex text into simple, structured explanations using AI.

---

## 🚀 Demo

<p align="center">
  <img src="screenshot.png" width="800"/>
</p>

---

## 🌐 Live Demo

👉 https://ai-study-explainer-git-main-notaaronjoses-projects.vercel.app/

---

## 🚀 Overview

AI Study Explainer is an AI-powered web application that simplifies long, complex text into clear and structured explanations.

It leverages transformer-based models to help students, developers, and researchers quickly understand large amounts of information with minimal effort.

---

## ✨ Features

- 🧠 AI-powered text summarization (BART model)
- 📄 Converts long content into concise explanations  
- 🔹 Bullet-point summaries for quick reading  
- 📌 Auto-generated titles  
- ⚡ Handles large text using chunking  
- 🎛️ Multiple modes: Short / Balanced / Detailed  
- 🧹 Smart text cleaning  

---

## 🛠️ Tech Stack

- **Frontend:** Streamlit  
- **Backend:** Python  
- **Model:** facebook/bart-large-cnn  
- **Libraries:** transformers, torch, sentencepiece, pyngrok  

---

## ⚙️ How It Works

1. User inputs text  
2. Text is cleaned and preprocessed  
3. Large input is split into chunks  
4. Each chunk is summarized using the AI model  
5. Summaries are combined and refined  

**Output:**
- 📌 Generated Title  
- 📄 Summary (bullets or paragraph)  

---

## 🧪 Example

**Input:**  
Long technical content (500+ words)

**Output:**  
- Key bullet points  
- Concise explanation  
- Auto-generated title  

📊 Reduces reading time by **~70–80%**

---

## 🚀 Installation & Setup

```bash
git clone https://github.com/NOTAaronjose/ai-study-explainer.git
cd ai-study-explainer
pip install -r requirements.txt
streamlit run app.py
