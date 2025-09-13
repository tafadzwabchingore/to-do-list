//facilitate structured user input and interaction within the terminal environment
import inquirer from "inquirer";

// Class to manage todo operations
class TodoManager {
    private todos: string[]; // List to store todo items

    constructor(initialTodos: string[]) {
        // Initialize the todos list with initial values
        this.todos = initialTodos;
    }

    // Start the app and display the main menu
    public async start(): Promise<void> {
        try {
            // Prompt user to select an operation
            const answer = await inquirer.prompt({
                type: "list", // Display a list of options
                name: "operation", // Key to access the selected choice
                message: "Select an operation", // Message displayed to user
                choices: ["Add", "Update", "View", "Delete", "Exit"], // Options
            });

            // Perform action based on the user's choice
            switch (answer.operation) {
                case "Add":
                    await this.addTodo(); // Add a new todo
                    break;
                case "Update":
                    await this.updateTodo(); // Update an existing todo
                    break;
                case "View":
                    this.viewTodos(); // Display all todos
                    break;
                case "Delete":
                    await this.deleteTodo(); // Delete a selected todo
                    break;
                case "Exit":
                    console.log("Exiting Todo App. Goodbye!");
                    return; // Exit the recursive loop
            }

            // Recursive call to continue showing the menu
            await this.start();

        } catch (error) {
            // Handle any errors that occur during input
            console.error("An error occurred:", error);
            // Continue the app even if an error occurs
            await this.start();
        }
    }

    // Add a new todo item
    private async addTodo(): Promise<void> {
        const answer = await inquirer.prompt({
            type: "input", // Text input for the new todo
            name: "todo",
            message: "Enter a new todo item:",
        });

        this.todos.push(answer.todo); // Add the item to the list
        console.log("Todo added successfully!");
    }

    // Update an existing todo item
    private async updateTodo(): Promise<void> {
        if (this.todos.length === 0) {
            console.log("No todos to update."); // Nothing to update
            return;
        }

        // Ask user which todo to update
        const answer = await inquirer.prompt({
            type: "list",
            name: "todoToUpdate",
            message: "Select a todo to update:",
            choices: this.todos, // Show current todos as choices
        });

        // Ask for the new value
        const newAnswer = await inquirer.prompt({
            type: "input",
            name: "newTodo",
            message: "Enter the updated todo:",
        });

        // Replace the old value with the new one
        const index = this.todos.indexOf(answer.todoToUpdate);
        this.todos[index] = newAnswer.newTodo;
        console.log("Todo updated successfully!");
    }

    // View all todos
    private viewTodos(): void {
        if (this.todos.length === 0) {
            console.log("No todos available.");
        } else {
            console.log("Your todos:");
            this.todos.forEach((todo, index) => 
                console.log(`${index + 1}. ${todo}`)
            );
        }
    }

    // Delete a selected todo
    private async deleteTodo(): Promise<void> {
        if (this.todos.length === 0) {
            console.log("No todos to delete.");
            return;
        }

        // Ask which todo to delete
        const answer = await inquirer.prompt({
            type: "list",
            name: "todoToDelete",
            message: "Select a todo to delete:",
            choices: this.todos, // Show current todos as choices
        });

        // Remove the selected todo from the list
        this.todos = this.todos.filter(todo => todo !== answer.todoToDelete);
        console.log("Todo deleted successfully!");
    }
}

// Initialize the todo manager with some default todos
const manager = new TodoManager([]);


// Start the app
manager.start();
