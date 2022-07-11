#include<iostream>
#include<map>
using namespace std;
                
                
int main()
{
    int n;
    cin>>n;
    int v[n];
    for(int i = 0; i < n; i++){
        cin>>v[i];
    }
    int target;
    cin>>target;
    map<int, int> ht;
    for(int i = 0; i < n; i++){
        if(ht[target-v[i]]){
            cout<<ht[target-v[i]]-1<<" "<<i<<"\n";
            break;
        }
    }
    return 0;
}