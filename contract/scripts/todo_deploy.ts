import { ethers } from 'hardhat';

import {
  Todo,
  Todo__factory
} from '../typechain-types';

async function main() {
  const TodoFactory: Todo__factory = await ethers.getContractFactory("Todo");
  const todo: Todo = await TodoFactory.deploy();

  await todo.deployed();

  console.log(`Todo deploy ${todo.address}`);

  console.log("accessing all task before creating any");
  listAllTask(await todo.getTodos());

  await todo.createTodo("task 1");
  await todo.createTodo("task 2");

  const myTask: Todo.TaskStructOutput = await todo.getTodo(1);

  console.log(
    "myTask - getting 1 task",
    myTask.id.toNumber(),
    myTask.content,
    myTask.completed
  );

  listAllTask(await todo.getTodos());

  //completing task 0;

  await todo.completeTask(0);

  console.log("after completing task 0");
  listAllTask(await todo.getTodos());

  //   console.log("getting task not created");
  //   await todo.getTodo(100);
}

function listAllTask(allTasks: Todo.TaskStructOutput[]) {
  allTasks.forEach((task) => {
    console.log(task.content, task.completed);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
