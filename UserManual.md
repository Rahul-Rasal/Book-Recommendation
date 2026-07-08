# User Manual Book Recommendation System
 
This manual explains how to use the Book Recommendation System from a user's point of
view.
 
---
 
## Table of Contents
 
- [What This Application Does](#what-this-application-does)
- [Getting Started](#getting-started)
- [Step 1 Search for a Book](#step-1--search-for-a-book)
- [Step 2 Select a Book](#step-2--select-a-book)
- [Step 3 Get Recommendations](#step-3--get-recommendations)
- [Step 4 Read the "Why Recommended?" Reasons](#step-4--read-the-why-recommended-reasons)
- [Step 5 View Full Details ("Read More")](#step-5--view-full-details-read-more)
- [Navigation (Home and About Pages)](#navigation-home-and-about-pages)
- [Tips](#tips)
- [Troubleshooting](#troubleshooting)
---
 
## What This Application Does
 
Book Recommender helps you discover books that are similar to one you already like.
Instead of browsing endless random lists, you start from a book you know, and the app
suggests similar titles each with a short, plain-language reason explaining why it
was recommended.
 
The recommendations are based on the content of each book's description, using a
text-similarity approach (TF-IDF and cosine similarity). You do not need an account or
login just open the app and start searching.
 
---
 
## Getting Started
 
Once the application is running (see the
[Installation Guide](../README.md#installation-guide)), open your web browser and go
to:
 
```
http://localhost:5173
```
 
You will see the home page with a title banner and a search box.
 
![Home page with search box and selected book](docs/screenshot-home.png)
 
---
 
## Step 1 Search for a Book
 
1. Locate the search box labeled **"Search book by title or author."**
2. Start typing the name of a book or an author. For example, type `The Hunger Games`.
3. As you type, a dropdown list of matching books appears automatically. You do not
   need to press Enter results update as you type.
The search matches on both **title** and **author**, and it is not case-sensitive, so
`hunger`, `Hunger`, and `HUNGER` all return the same results.
 
---
 
## Step 2 Select a Book
 
1. In the dropdown list of matches, find the book you want.
2. Click on it.
The dropdown closes and the chosen book is shown in a **Selected Book** panel, which
displays:
 
- The book cover image
- The title
- The author
- The rating, publication year, and language (shown as small tags)
- A **"Recommend Similar Books"** button
You can see the selected book panel in the screenshot above (the "Selected Book"
section below the search box).
 
---
 
## Step 3 Get Recommendations
 
1. With a book selected, click the **"Recommend Similar Books"** button.
2. The app finds the most similar books and displays them as a grid of cards under a
   **"Recommended Books"** heading.
Each recommended book is shown on its own card with the cover, title, author, rating,
and a short preview of the description.
 
![Recommended books shown as cards with explanations](docs/screenshot-recommendations.png)
 
---
 
## Step 4 Read the "Why Recommended?" Reasons
 
This is the key feature of the application. Every recommended book includes a
**"Why recommended?"** box that lists simple, human-readable reasons the book was
suggested. Depending on the book, the reasons may include:
 
- **The book description is similar to the selected book.**
- **Both books are written by the same author.**
- **This book is highly rated by readers.**
- **Both books were published in a similar time period.**
You can see these reason boxes on each card in the screenshot above. This lets you
understand *why* a book appears in your list, rather than just seeing an unexplained
suggestion.
 
---
 
## Step 5 View Full Details ("Read More")
 
The card only shows a short preview of each book's description. To see the full
description and the complete list of reasons:
 
1. Click the **"Read more"** link on any recommended book card.
2. A dialog (pop-up window) opens, showing:
   - The cover, author, and rating
   - The **full book description**
   - The full **"Why recommended?"** reasons
![Read more dialog showing the full book description](docs/screenshot-read-more.png)
 
3. When you are finished, click **"Close"** (or click outside the dialog) to return to
   the recommendations.
---
 
## Navigation (Home and About Pages)
 
The application has two pages, accessible from the navigation bar at the top:
 
- **Home** the main page where you search for a book and view recommendations.
- **About** a short page describing the project, its purpose, and what makes it
  useful.
Click **"Home"** or **"About"** in the top navigation bar to switch between them.
Switching pages does not reload the browser.
 
---
 
## Tips
 
- **Search by author:** You can type an author's name instead of a title to find their
  books (for example, `Suzanne Collins`).
- **Start a new search:** To look up a different book, clear the search box and type a
  new title or author. Selecting a new book resets the previous recommendations.
- **Ratings:** The rating shown on each book (for example, `Rating: 4.34`) is the
  average reader rating from the dataset.
- **Covers:** If a book has no cover image available, the card shows a "No Cover"
  placeholder instead.
---
 
## Troubleshooting
 
**The page does not load at http://localhost:5173**
Make sure the application is running. From the project folder, run
`docker compose up --build` and wait until the logs show that the backend startup is
complete. See the [Installation Guide](/README.md#installation-guide).
 
**Search shows no results**
Try a different or shorter search term (for example, a single distinctive word from
the title). The search matches text contained in the title or author, so partial words
work.
 
**Recommendations do not appear after clicking the button**
Ensure a book is selected first (the "Selected Book" panel should be visible). If the
problem continues, confirm the backend is running by opening
`http://localhost:8000/health` in your browser it should return a success message.
 
**Book covers are not showing**
Cover images are loaded from external links in the dataset. If a particular cover does
not load, the book will still work normally; only the image is affected.