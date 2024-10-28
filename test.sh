#!/bin/bash

# 循环遍历测试文件，从 1 到 8
for i in {1..8}
do
  # 运行 instrument.ts 脚本并生成对应的输出文件
  ts-node instrument.ts test/input${i}.ts test/output${i}.ts
  
  # 检查生成的文件是否存在，并执行生成的文件
  if [ -f "test/output${i}.ts" ]; then
    echo "Running output${i}.ts..."
    ts-node test/output${i}.ts
  else
    echo "Error: test/output${i}.ts not found"
  fi
done
