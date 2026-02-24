
import os
import subprocess
import sys
import glob

def find_sha256_file():
    """查找当前目录中的SHA256文件"""
    sha_files = glob.glob("*.SHA256")
    if not sha_files:
        print("错误: 当前目录中未找到.SHA256文件")
        return None
    if len(sha_files) > 1:
        print("警告: 发现多个.SHA256文件，将使用第一个:", sha_files[0])
    return sha_files[0]

def get_original_filename(sha_file):
    """从SHA256文件中提取原始文件名"""
    with open(sha_file, 'r') as f:
        content = f.read().strip()
        # SHA256格式为: "hash  filename"
        parts = content.split('  ', 1)
        if len(parts) == 2:
            return parts[1]
    return None

def merge_files():
    """合并分块文件"""
    # 查找SHA256文件
    sha_file = find_sha256_file()
    if not sha_file:
        return False

    # 获取原始文件名
    original_filename = get_original_filename(sha_file)
    if not original_filename:
        print("错误: 无法从SHA256文件中提取原始文件名")
        return False

    print(f"目标文件: {original_filename}")

    # 查找分块文件
    base_pattern = sha_file.replace('.SHA256', '')
    chunk_files = glob.glob(f"{base_pattern}.*")
    chunk_files.sort()  # 确保按顺序处理

    if not chunk_files:
        print(f"错误: 未找到 {base_pattern} 的分块文件")
        return False

    print(f"找到 {len(chunk_files)} 个分块文件")

    # 使用cat命令合并文件
    try:
        # 构建cat命令
        cat_command = ["cat"] + chunk_files
        with open(original_filename, 'wb') as output_file:
            subprocess.run(cat_command, stdout=output_file, check=True)

        print(f"文件合并完成: {original_filename}")

        # 自动校验
        print("开始校验文件完整性...")
        import checksum
        if checksum.verify_file(sha_file, original_filename):
            print("✓ 文件校验成功，SHA-256匹配")
            return True
        else:
            print("✗ 文件校验失败，SHA-256不匹配")
            return False

    except subprocess.CalledProcessError as e:
        print(f"合并文件时出错: {e}")
        return False
    except Exception as e:
        print(f"发生错误: {e}")
        return False

if __name__ == "__main__":
    merge_files()
