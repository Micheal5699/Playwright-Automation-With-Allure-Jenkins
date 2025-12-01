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
        - heading "Log in to Indigo" [level=1] [ref=e18]:
          - text: Log in
          - text: to Indigo
        - heading "Enter your details to login." [level=4] [ref=e19]
      - generic [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Email address
          - textbox "Email address" [ref=e25]:
            - /placeholder: johndoe@gmail.com
        - generic [ref=e26]:
          - generic [ref=e27]: Password
          - generic [ref=e28]:
            - textbox "Password" [ref=e29]:
              - /placeholder: "********"
            - generic [ref=e31]: 
        - generic [ref=e32]:
          - generic [ref=e36] [cursor=pointer]: Remember Me
          - link "Forgot Password?" [ref=e37] [cursor=pointer]:
            - /url: /reset
        - button "Login" [ref=e38] [cursor=pointer]
```