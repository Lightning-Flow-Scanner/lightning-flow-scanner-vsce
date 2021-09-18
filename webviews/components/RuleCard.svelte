<article class="rule-card">
    <h2>
        <slot name="label">
            <span class="missing">Unknown label</span>
        </slot>
    </h2>

    <div class="description">
        <slot name="description">
            <span class="missing">Unknown description</span>
        </slot>
    </div>

    <div class="uris">
        <strong>
            <slot name="doc">
                <span class="missing">Unknown location</span>
            </slot>
            <slot name="uri">
                <span class="missing">Unknown location</span>
            </slot>
        </strong>
    </div>

</article>
