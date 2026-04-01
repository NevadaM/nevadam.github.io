# CitizenQuery-UK: A Person-Centric AI Benchmark

| Date | Organisation | Topic | Type |
| :----: | :------------: | :-----: | :----: |
| 2025/26 | Open Data Institute | LLM Benchmarking | AI Research |

Citizen queries are questions asked by an individual about government policies, guidance, and services that are relevant to their circumstances, encompassing a range of topics including benefits, taxes, immigration, employment, public health, and more. This represents a compelling use case for large language models (LLMs) that respond to citizen queries with information that is adapted to a user's context and communicated according to their needs. However, in this use case, any misinformation could have severe, negative, likely invisible ramifications for an individual asking a citizen query.

To this effect, I led a multinational team on the development of CitizenQuery-UK, a benchmark dataset of over 22,000 pairs of citizen queries and responses that have been synthetically generated from the swathes of public information on gov.uk about government in the UK.

We present the curation methodology behind CitizenQuery-UK and an overview of its contents. We also introduce a methodology for benchmarking LLMs with the dataset, using it to benchmark 11 models for factuality, abstention frequency, and verbosity.

We document these results, and interpret them in the context of the public sector, finding:

**AI models are competitive with each other and will get better.**
Open, closed, small, and big models can do the job, and they’ll keep improving. “Vendor lock-in” should be avoided at all costs.

**High variance and “long tails” undermine trust.**
AI models are inconsistent and hard to rely upon, although many trust them in their day-to-day lives. We should focus on ensuring clear communication of the risk of misinformation and who people can go to in order to find the answers they’re looking for.

**Models like to talk -– a lot.**
With “word salads”, AI is overwhelming. But when we make it say less, it sometimes gets more things wrong, bringing in information from across the web rather than just focusing on authoritative government information. We need to improve the prioritisation of government sources, and this starts with making these sources AI-ready.

**AI is not brave enough to say “I don’t know.”**
A lack of fallibility massively undermines factuality and overall utility. Technology providers might not want their AI to admit it doesn’t know something, but no advice is better than bad advice when it comes to citizen queries.


The work was presented at the Neurips 2025 workshop on LLM Evaluation.  

[Read the preprint](https://doi.org/10.48550/arXiv.2602.04064)
