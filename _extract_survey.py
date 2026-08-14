import re, json

with open('recruit-analysis.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find SURVEY_DATA array
match = re.search(r'SURVEY_DATA\s*=\s*\[(.*?)\];', content, re.DOTALL)
if not match:
    print("SURVEY_DATA not found")
    exit()

raw = '[' + match.group(1) + ']'
# Try to parse as JSON
try:
    data = json.loads(raw)
except:
    # Maybe it's JS object notation with single quotes or unquoted keys
    # Try to find individual entries
    print("JSON parse failed, trying regex extraction")
    # Extract name fields and surrounding data
    entries = re.findall(r'\{[^}]*"name"\s*:\s*"([^"]*)"[^}]*\}', raw)
    print(f"Found {len(entries)} entries")
    for e in entries:
        print(e)
    exit()

print(f"Total survey responses: {len(data)}")
print(f"Keys: {list(data[0].keys()) if data else 'none'}")

# Target interviewees
targets = ['刘莹', '孙雨琪', '朱语婷', '刘伟钢', '刘伟刚', '张子璟', '张震', 
           '徐玲杰', '王雅岚', '刘嘉彦', '韩志群', '刘旋', '刘璇', '冯洁']

for item in data:
    name = item.get('name', item.get('Name', ''))
    for t in targets:
        if t in name:
            print(f"\n{'='*60}")
            print(f"Name: {name}")
            for k, v in item.items():
                print(f"  {k}: {v}")
            break
