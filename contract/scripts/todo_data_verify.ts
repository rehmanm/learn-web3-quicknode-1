import { ethers } from 'hardhat';

import {
  Todo,
  Todo__factory
} from '../typechain-types';

async function main() {
  const TodoFactory: Todo__factory = await ethers.getContractFactory("Todo");
  const todo: Todo = TodoFactory.attach(
    "0xA07cCb6B3Db31FBe4Df1bf8099A9D0263AdcE48d"
  );

  //await todo.deployed();

  console.log(`Todo deploy ${todo.address}`);

  listAllTask(await todo.getTodos());

  const myTask: Todo.TaskStructOutput = await todo.getTodo(0);

  console.log(
    "myTask - getting 1 task",
    myTask.id.toNumber(),
    myTask.content,
    myTask.completed
  );
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
