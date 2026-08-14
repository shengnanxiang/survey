import re, json

with open('recruit-analysis.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'SURVEY_DATA\s*=\s*\[(.*?)\];', content, re.DOTALL)
raw = '[' + match.group(1) + ']'
data = json.loads(raw)

# Search for partial matches
for item in data:
    name = item.get('name', '')
    if '孙' in name or '雨琪' in name or '徐' in name or '玲杰' in name or '徐玲' in name:
        print(f"\n{'='*60}")
        for k, v in item.items():
            print(f"  {k}: {v}")
