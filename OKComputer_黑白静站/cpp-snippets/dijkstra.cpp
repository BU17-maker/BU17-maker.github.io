// Dijkstra算法模板
#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> pii;

void dijkstra(vector<vector<pii>>& graph, int start, vector<int>& dist) {
    int n = graph.size();
    dist.assign(n, INT_MAX);
    vector<bool> visited(n, false);
    
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        int d = pq.top().first;
        pq.pop();
        
        if (visited[u]) continue;
        visited[u] = true;
        
        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}

int main() {
    int n = 6;
    vector<vector<pii>> graph(n);
    
    // 添加边 (u, v, weight)
    graph[0].push_back({1, 4});
    graph[0].push_back({2, 3});
    graph[1].push_back({2, 1});
    graph[1].push_back({3, 2});
    graph[2].push_back({3, 4});
    graph[3].push_back({4, 2});
    graph[4].push_back({5, 6});
    graph[3].push_back({5, 5});
    
    vector<int> dist;
    dijkstra(graph, 0, dist);
    
    cout << "Shortest distances from node 0:" << endl;
    for (int i = 0; i < n; i++) {
        cout << "To node " << i << ": " << dist[i] << endl;
    }
    
    return 0;
}