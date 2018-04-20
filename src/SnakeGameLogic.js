import { ROWS, COLS } from "./config";

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [
    {
      x: 2,
      y: 0
    },
    {
      x: 1,
      y: 0
    },
    {
      x: 0,
      y: 0
    }
  ];

  // 먹이의 좌표
  this.fruit = {
    x: 3,
    y: 5
  };

  this.direction = "right";
}

SnakeGameLogic.prototype.up = function() {
  console.log(this.joints);
  // this.joints.unshift({
  //   x: this.joints[0].x,
  //   y: this.joints[0].y - 1
  // });
  this.direction = "up";
  // this.joints.pop();
  console.log("up");
};

SnakeGameLogic.prototype.down = function() {
  console.log(this.joints);
  // this.joints.unshift({
  //   x: this.joints[0].x,
  //   y: this.joints[0].y + 1
  // });
  this.direction = "down";
  // this.joints.pop();
  console.log("down");
};

SnakeGameLogic.prototype.left = function() {
  console.log(this.joints);
  // this.joints.unshift({
  //   x: this.joints[0].x - 1,
  //   y: this.joints[0].y
  // });
  this.direction = "left";
  // this.joints.pop();
  console.log("left");
};

SnakeGameLogic.prototype.right = function() {
  console.log(this.joints);
  // this.joints.unshift({
  //   x: this.joints[0].x + 1,
  //   y: this.joints[0].y
  // });
  this.direction = "right";
  // this.joints.pop();
  console.log("right");
};

SnakeGameLogic.prototype.nextState = function() {
  // 벽에 부딪치면 사망

  if (this.direction === "right") {
    // 자동으로 움직이게 하는 로직
    this.joints.unshift({ x: this.joints[0].x + 1, y: this.joints[0].y });
  } else if (this.direction === "up") {
    this.joints.unshift({ x: this.joints[0].x, y: this.joints[0].y - 1 });
  } else if (this.direction === "left") {
    this.joints.unshift({ x: this.joints[0].x - 1, y: this.joints[0].y });
  } else {
    this.joints.unshift({ x: this.joints[0].x, y: this.joints[0].y + 1 });
  }

  if (this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y) {
    this.fruit = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    };
  } else {
    this.joints.pop();
  }

  if (
    this.joints[0].x > COLS - 1 ||
    this.joints[0].x < 0 ||
    this.joints[0].y > ROWS - 1 ||
    this.joints[0].y < 0
  ) {
    return false;
  }

  // 자기 몸에 닿아도 사망 : 몸통을 for 루프로 처리하여 this.joint[1 ~ this.joint.length]를 몸통으로 만들고 this.joint[0]이 몸통에 닿으면 사망시키는 시스템
  // let newHead = this.joints[0];
  // this.joints.some(item => item.x === newHead.x && item.y === newHead.y);
  // 또한 새로 생성되는 먹이가 몸에 겹치는 버그 고치는 로직

  for (let i = 1; i < this.joints.length; i++) {
    if (
      this.joints[0].x === this.joints[i].x &&
      this.joints[0].y === this.joints[i].y
    ) {
      return false;
    } else if (
      (this.joints[i].x === this.fruit.x &&
        this.joints[i].y === this.fruit.y) ||
      (this.joints[0].x === this.fruit.x && this.joints[0].y === this.fruit.y)
    ) {
      this.fruit = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
    }
  }

  console.log(`nextState`);
  return true;
};

export default SnakeGameLogic;
