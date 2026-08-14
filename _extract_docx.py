import zipfile, xml.etree.ElementTree as ET, glob, os

for docx in sorted(glob.glob('interview sessions/*.docx')):
    name = os.path.basename(docx).replace('.docx', '')
    out = f'_tmp_{name}.txt'
    try:
        with zipfile.ZipFile(docx) as z:
            with z.open('word/document.xml') as f:
                tree = ET.parse(f)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        texts = []
        for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            line = ''.join(node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
            if line.strip():
                texts.append(line)
        with open(out, 'w', encoding='utf-8') as f:
            f.write('\n'.join(texts))
        print(f"OK: {out} ({len('\\n'.join(texts))} chars)")
    except Exception as e:
        print(f"ERR: {docx}: {e}")
