import pdfplumber, glob

for pdf_file in sorted(glob.glob('*.pdf')):
    out_name = '_pdf_' + pdf_file.split('.')[0].replace(' ', '_') + '.txt'
    with open(out_name, 'w', encoding='utf-8') as f:
        f.write(f"FILE: {pdf_file}\n{'='*80}\n\n")
        with pdfplumber.open(pdf_file) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    f.write(f"\n--- Page {i+1} ---\n")
                    f.write(text)
                    f.write('\n')
    print(f"Done: {out_name}")
