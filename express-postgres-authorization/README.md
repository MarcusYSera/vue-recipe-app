silent refresh

jwt auth

https://www.google.com/search?sxsrf=ALeKk03oQmpSFRctLNQnUWT0ub9Hfqx4_g%3A1615357289156&ei=aWVIYP7_CMv99AOHxJmwDg&q=using+jwt+with+express+and+vuejs&oq=using+jwt+with+express+and+vuejs&gs_lcp=Cgdnd3Mtd2l6EAMyBwghEAoQoAEyBQghEKsCMgUIIRCrAjoUCAAQsAMQigMQtwMQ1AMQ5QIQiwM6BggAEBYQHjoICCEQFhAdEB46BQghEKABUNy5AViexgFgm8cBaAFwAngAgAGXAogB9wiSAQYxMC4wLjGYAQCgAQGqAQdnd3Mtd2l6yAEKuAECwAEB&sclient=gws-wiz&ved=0ahUKEwi-2J7riqXvAhXLPn0KHQdiBuYQ4dUDCA4&uact=5

cookies

express-session vs cookie-session

if using cookie session, make sure secret correlates between cookie session and cookie parser

figure out how to run in production as opposed to development

consider adding claims: iss(issuer), sub(subject), aud(audience) to jwt.sign for further verification
registered claims- sub, iss, exp, nbf
public claims - email, address, phone, unique values
private claims - private info such as an employee id or department name
