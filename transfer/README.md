
# 文件拆分与合并工具

这是一个用于将大文件拆分成小文件并通过GitHub传输的工具集，适用于需要从外网向内网传输大文件的场景。

## 文件说明

- `split.py`: 拆解端脚本，在外网运行，将大文件拆分成多个小文件
- `merge.py`: 合并端脚本，在内网运行，将小文件合并成原始文件
- `checksum.py`: 校验工具，验证文件的SHA-256哈希值

## 使用方法

### 外网（拆解端）

1. 运行拆分命令：
   ```
   python3 split.py <文件路径>
   ```

2. 示例：
   ```
   python3 split.py bigfile.iso
   ```

3. 执行后会在当前目录生成：
   - `bigfile.iso.SHA256` - 包含原始文件SHA-256哈希值的校验文件
   - `bigfile.iso.000`, `bigfile.iso.001`, ... - 拆分后的文件块
   - `➜  release git:(weiming) ✗ python ../transfer/split.py 20251128-0101-4K.mp4`

4. 将生成的所有文件（包括.SHA256文件和所有分块文件）提交到GitHub仓库：
   ```
   git add .
   git commit -m "添加拆分文件"
   git push
   ```

### 内网（合并端）

1. 从GitHub下载仓库的ZIP包：
   ```
   wget https://github.com/xxx/xxx/archive/refs/heads/main.zip
   ```

2. 解压ZIP包：
   ```
   unzip main.zip
   ```

3. 进入解压后的目录：
   ```
   cd xxx-main
   ```

4. 运行合并脚本：
   ```
   python3 merge.py
   ```

5. 脚本会自动：
   - 查找.SHA256文件和对应的分块文件
   - 使用`cat`命令合并分块文件
   - 校验合并后文件的SHA-256值

## 注意事项

1. **分块大小**：默认分块大小为50MB，确保不超过GitHub单文件100MB限制。如需调整，可修改`split.py`中的`CHUNK_SIZE`变量。

2. **依赖环境**：
   - 需要Python 3.x环境
   - 内网环境需要支持`cat`命令（Linux、macOS或Windows下的Git Bash/WSL）

3. **手动合并**：如果需要手动合并，也可以使用以下命令：
   ```
   cat bigfile.iso.0* > bigfile.iso
   sha256sum -c bigfile.iso.SHA256
   ```

4. **校验文件**：单独使用checksum.py可以计算或校验文件：
   ```
   # 计算文件的SHA-256
   python3 checksum.py <文件路径>

   # 校验文件（需要存在对应的.SHA256文件）
   python3 checksum.py <文件路径>
   ```

## 工作原理

1. **拆分过程**：
   - 计算原始文件的SHA-256哈希值并保存到.SHA256文件
   - 将原始文件按固定大小（默认50MB）拆分成多个顺序编号的文件块

2. **合并过程**：
   - 查找.SHA256文件获取原始文件名
   - 使用`cat`命令合并所有分块文件（利用Linux内核的splice零拷贝提高效率）
   - 计算合并后文件的SHA-256值并与.SHA256文件中的值比较

3. **校验过程**：
   - 读取.SHA256文件中的预期哈希值
   - 计算目标文件的实际哈希值
   - 比较两者是否一致
