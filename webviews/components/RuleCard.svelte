<article class="rule-card">
    <h2>
        <slot name="label">
            <span class="missing">Unknown label</span>
        </slot>
    </h2>

    <div class="name">
        <strong>
            <slot name="name">
                <span class="missing">Unknown name</span>
            </slot>
        </strong>
    </div>

    <div class="description">
        <slot name="description">
            <span class="missing">Unknown description</span>
        </slot>
    </div>
</article>
