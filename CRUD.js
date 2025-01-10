const fs = require('fs');
const filePath = './Data.json'; // File path for the JSON file

// Helper function to read data from the JSON file
const readData = (callback) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error && error.code !== 'ENOENT') {
            console.error('Error reading file:', error);
            callback([]);
        } else {
            const students = data ? JSON.parse(data) : [];
            callback(students);
        }
    });
};

// Helper function to write data to the JSON file
const writeData = (data, callback) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.error('Error writing to file:', error);
        } else if (callback) {
            callback();
        }
    });
};

// CREATE: Add a new student
const create = (student) => {
    readData((students) => {
        students.push(student);
        writeData(students, () => {
            console.log('Student added successfully!');
        });
    });
};

// READ: Get all students
const read = () => {
    readData((students) => {
        console.log('Students:', students);
    });
};

// UPDATE: Update a student by ID
const update = (id, updatedStudent) => {
    readData((students) => {
        const index = students.findIndex((s) => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedStudent };
            writeData(students, () => {
                console.log(`Student with ID ${id} updated successfully!`);
            });
        } else {
            console.log(`Student with ID ${id} not found.`);
        }
    });
};

// DELETE: Remove a student by ID
const remove = (id) => {
    readData((students) => {
        const updatedStudents = students.filter((s) => s.id !== id);
        writeData(updatedStudents, () => {
            console.log(`Student with ID ${id} deleted successfully!`);
        });
    });
};

// Example usage
create({ id: 1, name: 'John Doe', age: 20, course: 'CS' });
create({ id: 2, name: 'Jane Smith', age: 22, course: 'IT' });

setTimeout(() => read(), 1000); // Read all students
setTimeout(() => update(1, { name: 'John Updated', course: 'AI' }), 2000); // Update student with ID 1
setTimeout(() => remove(2), 3000); // Delete student with ID 2
setTimeout(() => read(), 4000); // Read all students again
