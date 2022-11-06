// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Todo {

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(address => uint) public userCounter;

    mapping(address => mapping(uint => Task)) public todoList;

    function createTodo(string memory _content) public {
        uint counter = userCounter[msg.sender];
      
        todoList[msg.sender][counter] = Task(counter, _content, false); 

        counter++;
        userCounter[msg.sender] = counter; 

    }

    function getTodos() public view returns(Task[] memory) {

        uint totalTask = userCounter[msg.sender];
        Task[] memory tasks = new Task[](totalTask);

        for (uint i=0; i<totalTask; i++) {
            tasks[i] = todoList[msg.sender][i];
        }

        return tasks;

    }

    function getTodo(uint taskId) public view returns (Task memory) {
        require(userCounter[msg.sender] >= taskId, "Please provide valid task id");
        return todoList[msg.sender][taskId];
    }

    function completeTask(uint taskId) public {
        Task memory task = todoList[msg.sender][taskId];
        task.completed = true;
        todoList[msg.sender][taskId] = task;
    }

}