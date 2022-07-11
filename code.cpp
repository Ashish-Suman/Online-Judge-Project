#include<bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin>>n;
    int a[n];
    for(int i = 0; i < n; i++){
        cin>>a[i];
    }
    int target;
    cin>>target;
    map<int, int> ht;
    for(int i = 0; i < n; i++){
        if(ht[target-a[i]]){
            cout<<ht[target-a[i]]-1<<" "<<i<<"\n";
            return 0;
        }
        ht[a[i]] = i+1;
    }
    return 0;
}
