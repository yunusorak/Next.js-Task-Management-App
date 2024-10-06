# Task Management App

A comprehensive task management application built with modern web technologies.

![Task Management App Overview](https://github.com/user-attachments/assets/7c404ce0-7741-47c2-b8cc-091d78d57511)


## Technologies Used

- MongoDB: Database
- Next.js: React framework for building the frontend and API routes
- Zustand: State management
- TailwindCSS: UI Theme
- Shadcn: UI components
- Next.js built-in localization

## Features

- Create and manage multiple boards
- Add lists to boards
- Create tasks within lists
- Task details include:
  - Assign members
  - Set due dates
  - Archive tasks
  - Share tasks
  - Add labels
  - Create checklists
  - Add project details
- Drag and drop functionality for tasks and lists
- Localization support for English and Turkish

![Task Details](https://github.com/user-attachments/assets/bfa37ab7-1086-4403-8914-0d7722058f6a)

## Known Issues and Future Improvements

- Some updates may not reflect immediately and may require a page refresh. This is due to the current implementation using a dbhelper instead of a proper API.
- Future plans include converting the dbhelper to a full-fledged API for better real-time updates and performance.

## Todo List / Roadmap

- [ ] Expand Zustand usage for more efficient state management
- [ ] Transition from dbhelper to a proper API structure
- [ ] Implement OAuth for enhanced authentication
- [ ] Add gamification features to increase user engagement
- [ ] Locale Switcher will be updated and full tr-en support will come
- [ ] Toast library will be added and the user will be informed about the transactions

**Note:** These planned features are subject to change and may or may not be implemented based on project priorities and resources.

## Getting Started

To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yunusorak/Next.js-Task-Management-App.git

# Navigate to the project directory
cd task-management-app

# Install dependencies
npm install

# Set up your environment variables
# Create a .env.local file and add your MongoDB connection string and any other necessary variables

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or support, please reach out:

LinkedIn: [Yunus Orak](https://www.linkedin.com/in/yunus-orak-258209157/)
