# Page snapshot

```yaml
- generic [ref=e3]:
  - region "Notifications Alt+T"
  - generic [ref=e4]:
    - link "Indigo EMR" [ref=e10] [cursor=pointer]:
      - /url: /login
      - img "Indigo EMR" [ref=e12]
    - generic [ref=e15]:
      - generic [ref=e17]:
        - heading "Select a location" [level=1] [ref=e18]:
          - text: Select a
          - text: location
        - heading "Select location to log into." [level=4] [ref=e19]
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e25]: Location
          - generic [ref=e26]:
            - log [ref=e28]
            - generic [ref=e29]:
              - generic [ref=e30]:
                - generic [ref=e31]: Luth
                - combobox [ref=e33]
              - img [ref=e36]
        - generic [ref=e38]:
          - generic [ref=e39]:
            - generic [ref=e40]: Enable JWT Authentication
            - generic [ref=e41]: Toggle JWT token-based authentication
          - generic [ref=e42]:
            - switch [checked] [ref=e43] [cursor=pointer]
            - checkbox [checked]
        - button "Continue" [active] [ref=e44]:
          - text: Continue
          - generic [ref=e45]:
            - img
        - generic [ref=e47] [cursor=pointer]: Logout
```