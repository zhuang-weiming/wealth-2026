
import os
import hashlib
import sys

# 默认分块大小为 50MB，确保不超过GitHub单文件100MB限制
CHUNK_SIZE = 50 * 1024 * 1024

def calculate_sha256(file_path):
    """计算文件的SHA-256哈希值"""
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def split_file(file_path):
    """将文件拆分成多个小文件"""
    if not os.path.exists(file_path):
        print(f"错误: 文件 '{file_path}' 不存在")
        return False

    # 计算原始文件的SHA-256
    sha256_hash = calculate_sha256(file_path)
    print(f"原始文件SHA-256: {sha256_hash}")

    # 创建SHA-256校验文件
    sha256_file = f"{file_path}.SHA256"
    with open(sha256_file, 'w') as f:
        f.write(f"{sha256_hash}  {os.path.basename(file_path)}\n")

    print(f"已创建校验文件: {sha256_file}")

    # 拆分文件
    with open(file_path, 'rb') as f:
        chunk_index = 0
        while True:
            chunk = f.read(CHUNK_SIZE)
            if not chunk:
                break

            chunk_filename = f"{file_path}.{chunk_index:03d}"
            with open(chunk_filename, 'wb') as chunk_file:
                chunk_file.write(chunk)

            print(f"已创建分块: {chunk_filename}")
            chunk_index += 1

    print(f"文件拆分完成，共生成 {chunk_index} 个分块")
    return True

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python3 split.py <文件路径>")
        sys.exit(1)

    file_path = sys.argv[1]
    split_file(file_path)
