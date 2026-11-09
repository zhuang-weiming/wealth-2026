
import os
import hashlib
import sys

def calculate_sha256(file_path):
    """计算文件的SHA-256哈希值"""
    sha256 = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b''):
            sha256.update(chunk)
    return sha256.hexdigest()

def verify_file(sha_file, target_file):
    """验证文件的SHA-256是否与SHA文件中的一致"""
    if not os.path.exists(sha_file):
        print(f"错误: SHA文件 '{sha_file}' 不存在")
        return False

    if not os.path.exists(target_file):
        print(f"错误: 目标文件 '{target_file}' 不存在")
        return False

    # 从SHA文件中读取预期的哈希值
    with open(sha_file, 'r') as f:
        content = f.read().strip()
        # SHA256格式为: "hash  filename"
        parts = content.split('  ', 1)
        if len(parts) != 2:
            print("错误: SHA文件格式不正确")
            return False
        expected_hash = parts[0]

    # 计算目标文件的实际哈希值
    actual_hash = calculate_sha256(target_file)

    # 比较哈希值
    if expected_hash == actual_hash:
        return True
    else:
        print(f"SHA-256不匹配:")
        print(f"  预期: {expected_hash}")
        print(f"  实际: {actual_hash}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python3 checksum.py <文件路径>")
        sys.exit(1)

    file_path = sys.argv[1]
    sha_file = f"{file_path}.SHA256"

    if os.path.exists(sha_file):
        if verify_file(sha_file, file_path):
            print(f"✓ {file_path} 校验成功")
        else:
            print(f"✗ {file_path} 校验失败")
    else:
        # 如果SHA文件不存在，则计算并显示当前文件的SHA-256
        hash_value = calculate_sha256(file_path)
        print(f"{file_path} 的SHA-256: {hash_value}")
