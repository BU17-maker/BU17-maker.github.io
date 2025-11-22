// 并查集模板
#include <bits/stdc++.h>
using namespace std;

class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
    int count; // 连通分量个数

public:
    UnionFind(int n) {
        count = n;
        parent.resize(n);
        rank.resize(n, 1);
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    // 查找根节点（路径压缩）
    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // 路径压缩
        }
        return parent[x];
    }
    
    // 合并两个集合（按秩合并）
    void unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return;
        
        // 按秩合并
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        
        count--;
    }
    
    // 检查两个元素是否连通
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
    
    // 获取连通分量个数
    int getCount() {
        return count;
    }
    
    // 获取每个连通分量的大小
    vector<int> getSize(int n) {
        vector<int> size(n, 0);
        for (int i = 0; i < n; i++) {
            size[find(i)]++;
        }
        return size;
    }
};

// 带权并查集
class WeightedUnionFind {
private:
    vector<int> parent;
    vector<int> rank;
    vector<int> diff; // diff[i] 表示 i 到父节点的距离差

public:
    WeightedUnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 1);
        diff.resize(n, 0);
        
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }
    
    int find(int x) {
        if (parent[x] != x) {
            int orig_parent = parent[x];
            parent[x] = find(parent[x]);
            diff[x] += diff[orig_parent];
        }
        return parent[x];
    }
    
    void unite(int x, int y, int weight) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return;
        
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
            diff[rootX] = diff[y] - diff[x] + weight;
        } else {
            parent[rootY] = rootX;
            diff[rootY] = diff[x] - diff[y] - weight;
            if (rank[rootX] == rank[rootY]) {
                rank[rootX]++;
            }
        }
    }
    
    bool connected(int x, int y) {
        return find(x) == find(y);
    }
    
    // 获取 x 和 y 之间的权重差
    int getWeight(int x, int y) {
        if (!connected(x, y)) {
            return INT_MAX; // 不连通
        }
        return diff[x] - diff[y];
    }
};

int main() {
    UnionFind uf(10);
    
    uf.unite(1, 2);
    uf.unite(3, 4);
    uf.unite(1, 3);
    
    cout << "1 and 4 are " << (uf.connected(1, 4) ? "connected" : "not connected") << endl;
    cout << "Number of connected components: " << uf.getCount() << endl;
    
    // 带权并查集示例
    WeightedUnionFind wuf(5);
    wuf.unite(0, 1, 10);
    wuf.unite(1, 2, 20);
    
    cout << "Weight difference between 0 and 2: " << wuf.getWeight(0, 2) << endl;
    
    return 0;
}