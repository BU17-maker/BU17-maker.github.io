// 二分查找模板
#include <bits/stdc++.h>
using namespace std;

// 基本二分查找
template<typename T>
int binarySearch(const vector<T>& arr, const T& target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // 未找到
}

// 查找左边界（第一个大于等于target的位置）
template<typename T>
int lowerBound(const vector<T>& arr, const T& target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// 查找右边界（第一个大于target的位置）
template<typename T>
int upperBound(const vector<T>& arr, const T& target) {
    int left = 0, right = arr.size();
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// 在旋转有序数组中查找最小值
int findMinInRotatedArray(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return nums[left];
}

// 在旋转有序数组中查找目标值
int searchInRotatedArray(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        // 左半部分有序
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // 右半部分有序
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int target = 7;
    
    cout << "Array: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    int index = binarySearch(arr, target);
    cout << "Target " << target << " found at index: " << index << endl;
    
    int lb = lowerBound(arr, 6);
    cout << "Lower bound of 6: " << lb << " (value: " << arr[lb] << ")" << endl;
    
    int ub = upperBound(arr, 7);
    cout << "Upper bound of 7: " << ub << endl;
    
    // 旋转数组示例
    vector<int> rotated = {4, 5, 6, 7, 0, 1, 2};
    int minVal = findMinInRotatedArray(rotated);
    cout << "Minimum in rotated array: " << minVal << endl;
    
    int searchIndex = searchInRotatedArray(rotated, 0);
    cout << "Target 0 found at index: " << searchIndex << endl;
    
    return 0;
}