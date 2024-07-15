#include<vector>
#include<iostream>
using namespace std;

vector <int> unionOf(vector < int > a, vector < int > b) {
    vector<int> ans;
    int i = 0, j = 0;

    // O(n+m)
    while(i < a.size() && j < b.size()) {
        if(a[i] <= b[j]) {
            if(ans.size() == 0 || ans.back() != a[i]) ans.push_back(a[i]);
            i++;
        } else {
            if(ans.size() == 0 || ans.back() != b[j]) ans.push_back(b[j]);
            j++;
        }
    }

    while(j < b.size()) {
        if(ans.size() == 0 || ans.back() != b[j]) ans.push_back(b[j]);
        j++;
    }


    while(i < a.size()) {
        if(ans.size() == 0 || ans.back() != a[i]) ans.push_back(a[i]);
        i++;
    }

    return ans;
}


int main() {
    vector<int> a = {1, 1, 2, 3, 4, 5};
    vector<int> b = {2, 3, 4, 4, 5, 6, 8};
    vector<int> ans = unionOf(a, b);
    for(auto i : ans) {
        cout<<i<<" ";
    }
    return 0;
}

