# MD7 Sales Academy
## Database Schema & Content Model

---

# Philosophy

The application is not chapter-driven.

It is Knowledge Object driven.

Every piece of information exists independently and is related through metadata.

This allows infinite cross-linking without duplicating content.

---

# Core Entity: KnowledgeObject

Fields

- id
- slug
- title
- subtitle
- summary
- type
- body
- estimatedReadTime
- difficulty
- status
- version
- createdAt
- updatedAt

---

# Supported Types

- Chapter
- Framework
- Conversation
- Question
- Exercise
- Objection
- CustomerProfile
- Glossary
- Worksheet
- Checklist
- Diagram
- Timeline
- Quote
- ExecutiveInsight

---

# Relationships

Each object can reference:

- Parent
- Children
- Related Objects
- Related Chapters
- Related Exercises
- Related Conversations
- Related Customer Profiles
- Related Questions
- Related Objections

Many-to-many relationships are preferred.

---

# Tags

Every object supports unlimited tags.

Examples:

Discovery

Negotiation

Trust

Retirement

Estate Planning

Lease Optimization

Buyout

Commercial

Agriculture

Municipality

Risk

Legacy

---

# User Progress

Track

- Started
- Reading Progress
- Exercises Completed
- Reflection Completed
- Knowledge Check
- Completion Date

---

# Notes

Users may create:

Private Notes

Bookmarks

Favorites

Highlights

Reflection Entries

---

# Search Index

Search indexes:

Title

Summary

Tags

Body

Related Objects

Customer Types

Decision Drivers

Stages

Glossary Terms

---

# Future Compatibility

Database should allow future additions without schema redesign.

Prefer normalized relationships.